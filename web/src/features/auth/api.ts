import { type LoginRequest, type UserResponse } from '@/features/auth/contracts'
import { apiClient } from '@/lib/api/client'
import { API_URLS } from '@/lib/api/urls'

async function login(data: LoginRequest) {
  const response = await apiClient.post<UserResponse>(API_URLS.auth.login, data)

  return response.data
}

async function logout() {
  return await apiClient.post(API_URLS.auth.logout)
}

async function getCurrentUser() {
  return await apiClient.get<UserResponse>(API_URLS.auth.me)
}

export { getCurrentUser, login, logout }
