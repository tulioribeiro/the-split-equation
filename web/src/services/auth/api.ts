import type { LoginRequest, LoginResponse } from '@/contracts/auth'
import { apiClient } from '@/lib/api/client'
import { API_URLS } from '@/lib/api/urls'

async function login(data: LoginRequest) {
  const response = await apiClient.post<LoginResponse>(
    API_URLS.auth.login,
    data,
  )

  return response.data
}

async function logout() {
  return await apiClient.post(API_URLS.auth.logout)
}

export { login, logout }
