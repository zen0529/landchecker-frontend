import { useCallback, useMemo, useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { getProperties } from "../api/propertiesApi"
import { PER_PAGE } from "../constants/propertyConstants"
import { useDebounce } from "@/hooks/useDebounce"
import { buildQueryParams } from "../utils/filterBuilder"

const fetchProperties = async ({ pageParam, queryKey }) => {
    const [_key, params] = queryKey

    const response = await getProperties({
        page: pageParam,
        perPage: PER_PAGE,
        ...params
    })

    const data = response.properties || response.data || response
    const meta = response.meta || {}
    
    let hasMore
    if (meta.current_page && meta.total_pages) {
        hasMore = meta.current_page < meta.total_pages
    } else {
        hasMore = Array.isArray(data) && data.length === PER_PAGE
    }

    return {
        data,
        nextPage: hasMore ? pageParam + 1 : undefined,
        total: meta.total_count || (Array.isArray(data) ? data.length : 0)
    }
}

export const usePropertiesQuery = (filters, searchQuery, sortBy, sortDir) => {
    const debouncedSearch = useDebounce(searchQuery, 400)
    
    const queryParams = useMemo(() => 
        buildQueryParams(filters, debouncedSearch, sortBy, sortDir),
    [filters, debouncedSearch, sortBy, sortDir])

    const query = useInfiniteQuery({
        queryKey: ["properties", queryParams],
        queryFn: fetchProperties,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
    })

    const sentinelRef = useCallback(node => {
        if (!node) return
        const obs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && query.hasNextPage && !query.isFetchingNextPage) {
                query.fetchNextPage()
            }
        }, { threshold: 0.1 })
        obs.observe(node)
        return () => obs.disconnect()
    }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage])

    useEffect(() => {
        if (query.isError && !query.isFetchingNextPage) {
            toast.error("Failed to fetch properties. Please check your connection.")
        }
    }, [query.isError, query.isFetchingNextPage])

    return { ...query, sentinelRef }
}
