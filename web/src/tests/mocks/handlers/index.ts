import { http, HttpResponse } from 'msw'

import { db } from '@/tests/mocks/data'
import { authHandlers } from '@/tests/mocks/handlers/auth'

export const handlers = [
  http.get('health', () => {
    return HttpResponse.json({ status: 'ok' })
  }),

  http.get('users', () => {
    const users = db.user.getAll()
    return HttpResponse.json(users)
  }),

  ...authHandlers,
]
