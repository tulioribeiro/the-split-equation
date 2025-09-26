type CookieEntry = {
  key: string
  value: string
  maxAge: string
  creation: string
  [key: string]: string
}

type SessionDetails = {
  sessionId: string
  createdAt: string
  maxAge: number
}

function retrieveMswSession(jsonString: string): SessionDetails | null {
  if (typeof window === 'undefined') {
    return null
  }

  if (!jsonString || jsonString.trim() === '') {
    return null
  }

  try {
    const data: CookieEntry[] = JSON.parse(jsonString)

    if (!Array.isArray(data)) {
      return null
    }
    const accessTokenEntry = data.find(
      (entry) => entry && entry.key === 'access_token',
    )
    if (accessTokenEntry) {
      const { value, maxAge, creation } = accessTokenEntry

      return {
        sessionId: value,
        createdAt: creation,
        maxAge: Number(maxAge),
      }
    }

    return null
  } catch (error) {
    console.error('Error parsing JSON string:', error)

    return null
  }
}

export { retrieveMswSession }
