import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Hello } from '@/components/hello'
import { API_URLS } from '@/lib/api-urls'

describe('Hello component', () => {
  it('renders the correct text', () => {
    render(<Hello />)
    expect(screen.getByText('Hello from the component!')).toBeInTheDocument()
  })

  it('can reach the api', async () => {
    const res = await fetch(API_URLS.auth.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'hardpassword',
      }),
    })

    const data = await res.json()

    console.log(data)

    expect(res.status).toBe(200)
    expect(data).toHaveProperty('name')
  })
})
