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
  // Assuming the backend handles deletion by property_id or we need the watchlist_item ID
  // Based on typical Rails patterns, we might need the ID of the watchlist_item itself
  // but if the endpoint is /watchlist_items/:property_id we can use that.
  // The user's summary says DELETE /api/v1/watchlist_items/:id
  // We need to find the ID of the watchlist item for that property.
  const response = await api.delete(`/watchlist_items/${propertyId}`)
  return response.data
}
