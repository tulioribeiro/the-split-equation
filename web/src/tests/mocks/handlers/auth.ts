import { http, HttpResponse } from 'msw'

import { API_URLS } from '@/lib/api-urls'
import { db } from '@/tests/mocks/data'

const authHandlers = [
  http.post(API_URLS.auth.login, async ({ request }) => {
    // @FIXME: type this properly later
    const body = (await request.json()) as { email: string; password: string }
    const user = db.user.findFirst({
      where: {
        email: { equals: body.email },
        password: { equals: body.password },
      },
    })

    if (!user) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      )
    }

    // @TODO: set a cookie or something

    return HttpResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  }),
]

export { authHandlers }
