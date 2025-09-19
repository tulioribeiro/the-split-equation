import { QueryClient } from '@tanstack/react-query'

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: FIVE_MINUTES_IN_MS,
    },
  },
})

export { queryClient }
