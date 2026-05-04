import { api } from "@/api/axiosInstance"

export const getProperties = async ({ page, perPage, ...params }) => {
  const requestParams = {
    page,
    per_page: perPage,
    ...params
  }
  
  const response = await api.get("/properties", { params: requestParams })
  return response.data
}

export const getProperty = async (id) => {
  const response = await api.get(`/properties/${id}`)
  return response.data
}
