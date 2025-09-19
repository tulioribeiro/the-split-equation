import axios from 'axios'

import { API_URL } from '@/config/consts'

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // @TODO: handle errors globally?
    console.error(error)

    return Promise.reject(error)
  },
)

export { apiClient }
