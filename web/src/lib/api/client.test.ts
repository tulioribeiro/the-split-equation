import axios from 'axios'

import { apiClient, transformError } from './client'

describe('apiClient interceptors', () => {
  it('should transform a real Axios error with unknown endpoint', async () => {
    await expect(
      apiClient.get('/this-endpoint-does-not-exist'),
    ).rejects.toThrow()
  })

  it('should transform error responses to Error with correct message', async () => {
    vi.spyOn(axios, 'isAxiosError').mockImplementation(() => true)
    const error = {
      response: { data: { message: 'Custom error' } },
      isAxiosError: true,
    }

    await expect(transformError(error)).rejects.toThrow('Custom error')
  })

  it('should pass through non-Axios errors', async () => {
    const error = new Error('Some other error')

    await expect(transformError(error)).rejects.toThrow('Some other error')
  })
})
