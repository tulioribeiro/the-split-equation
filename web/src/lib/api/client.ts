import axios from 'axios'

import { API_URL } from '@/config/consts'

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const msg = error.response.data?.message || 'Unknown error'
      return Promise.reject(new Error(msg))
    }

    return Promise.reject(error)
  },
)

export { apiClient }
