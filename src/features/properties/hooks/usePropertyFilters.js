import { useState, useCallback, useMemo } from "react"
import { countActiveFilters } from "../utils/filterBuilder"

export const usePropertyFilters = () => {
    const [filters, setFilters] = useState({})
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("created_at")
    const [sortDir, setSortDir] = useState("desc")

    const handleFilterChange = useCallback((key, value) => {
        if (key === "__reset__") { setFilters({}); return }
        setFilters(prev => ({ ...prev, [key]: value }))
    }, [])

    const activeFilterCount = useMemo(() => countActiveFilters(filters), [filters])

    return {
        filters,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        sortDir,
        setSortDir,
        handleFilterChange,
        activeFilterCount,
    }
}