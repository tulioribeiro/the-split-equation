import { APP_ENV } from '@/config/env'

export async function enableMocking() {
  if (typeof window === 'undefined') return
  if (!import.meta.env.DEV) return
  if (!APP_ENV.VITE_ENABLE_API_MOCKING) return

  console.log('✅ MSW enabled for development')

  const { worker } = await import('./browser')

  return await worker.start()
}
