// This is the entire filtered useMemo logic extracted out of App
import { MOCK_PROPERTIES } from '../constants/propertyConstants'

export const applyFilters = (properties, filters, searchQuery) => {
    let result = properties
    const q = searchQuery.toLowerCase().trim()

    if (q) result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.suburb.toLowerCase().includes(q)
    )
    if (filters.property_type?.length)
        result = result.filter(p => filters.property_type.includes(p.property_type))
    if (filters.min_price)
        result = result.filter(p => p.price >= filters.min_price)
    if (filters.max_price)
        result = result.filter(p => p.price <= filters.max_price)
    if (filters.bedrooms != null)
        result = result.filter(p => p.bedrooms >= filters.bedrooms)
    if (filters.bathrooms != null)
        result = result.filter(p => p.bathrooms >= filters.bathrooms)
    return result
}

export const applySorting = (properties, sortBy, sortDir) => {
    const dir = sortDir === "asc" ? 1 : -1
    return [...properties].sort((a, b) => {
        if (sortBy === "price") return (a.price - b.price) * dir
        if (sortBy === "bedrooms") return (a.bedrooms - b.bedrooms) * dir
        
        // For created_at, Newest (desc) means fewer days_listed (asc)
        // So we invert the direction for days_listed
        if (sortBy === "created_at") {
            return (a.days_listed - b.days_listed) * (dir * -1)
        }
        
        return (a.days_listed - b.days_listed) * dir
    })
}

export const countActiveFilters = (filters) => {
    let n = 0
    if (filters.property_type?.length) n++
    if (filters.min_price || filters.max_price) n++
    if (filters.bedrooms != null) n++
    if (filters.bathrooms != null) n++
    return n
}

export const buildQueryParams = (filters, searchQuery, sortBy, sortDir) => {
    const params = {}

    if (searchQuery?.trim()) {
        params.q = searchQuery.trim()
    }

    if (sortBy && sortDir) {
        params.sort_by = sortBy
        params.sort_dir = sortDir
    }

    Object.entries(filters).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") return

        if (key === "property_type" && Array.isArray(value)) {
            if (value.length > 0) {
                // If the backend doesn't support arrays with [], try sending as a single string or comma-separated
                // Given the curl test used property_type=apartment, we'll send the first one if only one, 
                // or comma-separated if multiple (though backend might only support one)
                params[key] = value.join(",")
            }
        } else {
            params[key] = value
        }
    })

    return params
}