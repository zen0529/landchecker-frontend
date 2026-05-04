import { api } from "@/api/axiosInstance"

export const getWatchlist = async () => {
  const response = await api.get("/watchlist_items")
  return response.data
}

export const addToWatchlist = async (propertyId) => {
  const response = await api.post("/watchlist_items", {
    watchlist_item: { property_id: propertyId }
  })
  return response.data
}

export const removeFromWatchlistApi = async (propertyId) => {
  const response = await api.delete(`/watchlist_items/${propertyId}`)
  return response.data
}
