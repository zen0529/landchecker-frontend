import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react"
import { toast } from "sonner"
import { getWatchlist, addToWatchlist, removeFromWatchlistApi } from "@/features/watchlist/api/watchlistApi"
import { useAuth } from "./authContext"

const WatchlistContext = createContext(null)

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([])
  const { isAuthenticated } = useAuth()

  // Fetch watchlist on mount or when auth changes
  useEffect(() => {
    if (isAuthenticated) {
      getWatchlist()
        .then(data => {
          // Handle cases where Rails might wrap the response in a key (like 'data' or 'watchlist_items')
          const items = Array.isArray(data) ? data : (data?.watchlist_items || data?.data || [])
          setWatchlist(items)
        })
        .catch(err => {
          console.error("Failed to fetch watchlist", err)
          toast.error("Unable to load your watchlist")
          setWatchlist([])
        })
    } else {
      setWatchlist([])
    }
  }, [isAuthenticated])

  const watchedIds = useMemo(
    () => new Set(Array.isArray(watchlist) ? watchlist.map((w) => w.property_id) : []),
    [watchlist]
  )

  const toggleWatch = useCallback(
    async (property) => {
      if (!isAuthenticated) {
        toast.error("Please login to save properties")
        return
      }

      const existingItem = watchlist.find(w => w.property_id === property.id)

      if (existingItem) {
        try {
          await removeFromWatchlistApi(existingItem.id)
          setWatchlist((prev) => prev.filter((w) => w.property_id !== property.id))
          toast.error("Removed from watchlist")
        } catch (err) {
          toast.error("Failed to remove from watchlist")
        }
      } else {
        try {
          const data = await addToWatchlist(property.id)
          const newItem = data?.watchlist_item || data?.data || data
          setWatchlist((prev) => [...prev, newItem])
          toast.success("Saved to watchlist")
        } catch (err) {
          toast.error("Failed to save to watchlist")
        }
      }
    },
    [watchlist, isAuthenticated]
  )

  const removeFromWatchlist = useCallback(async (propertyId) => {
    const existingItem = watchlist.find(w => w.property_id === propertyId)
    if (!existingItem) return

    try {
      await removeFromWatchlistApi(existingItem.id)
      setWatchlist((prev) => prev.filter((w) => w.property_id !== propertyId))
      toast.error("Removed from watchlist")
    } catch (err) {
      toast.error("Failed to remove from watchlist")
    }
  }, [watchlist])

  return (
    <WatchlistContext.Provider
      value={{ watchlist, watchedIds, toggleWatch, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlistContext = () => {
  const ctx = useContext(WatchlistContext)
  if (!ctx) throw new Error("useWatchlistContext must be used inside <WatchlistProvider>")
  return ctx
}
