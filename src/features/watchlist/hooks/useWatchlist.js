import { useState, useCallback, useMemo } from "react"
import { toast } from "sonner"

export const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState([
        { property_id: 3 }, { property_id: 9 }
    ])

    const watchedIds = useMemo(() =>
        new Set(watchlist.map(w => w.property_id)),
        [watchlist])

    const toggleWatch = useCallback((property) => {
        if (watchedIds.has(property.id)) {
            setWatchlist(prev => prev.filter(w => w.property_id !== property.id))
            toast.error("Removed from watchlist")
        } else {
            setWatchlist(prev => [...prev, { property_id: property.id }])
            toast.success("Saved to watchlist")
        }
    }, [watchedIds])

    const removeFromWatchlist = useCallback((id) => {
        setWatchlist(prev => prev.filter(w => w.property_id !== id))
        toast.error("Removed from watchlist")
    }, [])

    return { watchlist, watchedIds, toggleWatch, removeFromWatchlist }
}