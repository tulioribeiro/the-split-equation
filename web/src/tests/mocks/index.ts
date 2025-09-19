import { IS_DEV } from '@/config/consts'
import { APP_ENV } from '@/config/env'

export async function enableMocking() {
  if (typeof window === 'undefined') return
  if (!IS_DEV) return
  if (!APP_ENV.VITE_ENABLE_API_MOCKING) return

  console.log('✅ MSW enabled for development')

  const { worker } = await import('./browser')

  return await worker.start()
}
