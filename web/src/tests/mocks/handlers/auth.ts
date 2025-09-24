import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

import { LoginRequestSchema, LoginResponseSchema } from '@/contracts/auth'
import { API_URLS } from '@/lib/api/urls'
import { db } from '@/tests/mocks/data'

const authHandlers = [
  http.post(API_URLS.auth.login, async ({ request }) => {
    const body = await request.json()
    const parsed = LoginRequestSchema.safeParse(body)

    if (!parsed.success) {
      return HttpResponse.json(
        { message: 'Invalid request', errors: parsed.error },
        { status: 400 },
      )
    }

    const user = db.user.findFirst({
      where: {
        email: { equals: parsed.data.email },
        password: { equals: parsed.data.password },
      },
    })

    if (!user) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      )
    }

    const validated = LoginResponseSchema.parse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    const fakeSessionAuth = faker.string.uuid()
    const fakeSessionRefresh = faker.string.uuid()
    const THIRTY_MINUTES_IN_SECONDS = 30 * 60
    const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60

    return HttpResponse.json(validated, {
      status: 200,
      headers: {
        'Set-Cookie': [
          `access_token=${fakeSessionAuth}; HttpOnly; Path=/; Max-Age=${THIRTY_MINUTES_IN_SECONDS}`,
          `refresh_token=${fakeSessionRefresh}; HttpOnly; Path=/; Max-Age=${SEVEN_DAYS_IN_SECONDS}`,
        ].join(', '),
      },
    })
  }),

  http.post(API_URLS.auth.logout, () => {
    return HttpResponse.json(undefined, {
      status: 200,
      headers: {
        'Set-Cookie': [
          `access_token=; HttpOnly; Path=/; Max-Age=0`,
          `refresh_token=; HttpOnly; Path=/; Max-Age=0`,
        ].join(', '),
      },
    })
  }),
]

export { authHandlers }
