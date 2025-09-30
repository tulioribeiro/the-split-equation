import { http, HttpResponse } from 'msw'

import {
  ForgotPasswordRequestSchema,
  LoginRequestSchema,
  RegisterRequestSchema,
  UserResponseSchema,
} from '@/features/auth/contracts'
import { API_URLS } from '@/lib/api/urls'
import { db } from '@/tests/mocks/data'
import { retrieveMswSession } from '@/tests/mocks/utils/retrieve-msw-session'

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

    const parsedData = UserResponseSchema.parse({ user })

    // using the user.id as access_token just for mocking purposes
    // so i can retrieve it later at auth/me
    return HttpResponse.json(parsedData, {
      status: 200,
      headers: {
        'Set-Cookie': `access_token=${user.id}; HttpOnly; Path=/; Max-Age=3600`,
      },
    })
  }),

  http.post(API_URLS.auth.logout, () => {
    return HttpResponse.json(undefined, {
      status: 200,
      headers: {
        'Set-Cookie': 'access_token=; HttpOnly; Path=/; Max-Age=0',
      },
    })
  }),

  http.get(API_URLS.auth.me, () => {
    const userSession = retrieveMswSession(
      window.localStorage.getItem('__msw-cookie-store__') || '',
    )

    // no previous session
    if (!userSession) {
      return HttpResponse.json({}, { status: 401 })
    }

    const { createdAt, maxAge, sessionId } = userSession

    const maxAgeInMs = 1000 * maxAge
    const expiresAt = new Date(createdAt).getTime() + maxAgeInMs

    if (expiresAt < Date.now()) {
      return HttpResponse.json(
        {
          message: 'Session expired',
        },
        { status: 401 },
      )
    }

    const user = db.user.findFirst({
      where: {
        id: {
          equals: sessionId,
        },
      },
    })

    if (!user) {
      return HttpResponse.json({}, { status: 404 })
    }

    const parsedData = UserResponseSchema.parse({ user })

    if (!parsedData) {
      return HttpResponse.json({}, { status: 404 })
    }

    return HttpResponse.json(parsedData, { status: 200 })
  }),

  http.post(API_URLS.auth.register, async ({ request }) => {
    const body = await request.json()
    const requestParsed = RegisterRequestSchema.safeParse(body)

    if (!requestParsed.success) {
      return HttpResponse.json(
        { message: 'Invalid request', errors: requestParsed.error },
        { status: 400 },
      )
    }

    const user = db.user.findFirst({
      where: {
        email: { equals: requestParsed.data.email },
      },
    })

    if (user) {
      return HttpResponse.json(
        { message: 'Credentials already in use' },
        { status: 401 },
      )
    }

    const parsedData = RegisterRequestSchema.safeParse({
      name: requestParsed.data.name,
      email: requestParsed.data.email,
      password: requestParsed.data.password,
    })

    return HttpResponse.json(
      { user: parsedData.data },
      {
        status: 200,
      },
    )
  }),

  http.post(API_URLS.auth.forgotPassword, async ({ request }) => {
    const body = await request.json()
    const parsed = ForgotPasswordRequestSchema.safeParse(body)

    if (!parsed.success) {
      return HttpResponse.json(
        { message: 'Invalid request', errors: parsed.error },
        { status: 400 },
      )
    }

    return HttpResponse.json({ status: 200 })
  }),
]

export { authHandlers }
