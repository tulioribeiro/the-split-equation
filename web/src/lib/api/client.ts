import axios from 'axios'

import { API_URL } from '@/config/consts'

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export function transformError(error: unknown) {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return Promise.reject(new Error(error.response.data.message))
  }

  return Promise.reject(error)
}

apiClient.interceptors.response.use((response) => response, transformError)

export { apiClient }
