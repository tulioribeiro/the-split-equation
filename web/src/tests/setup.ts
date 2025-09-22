import '@testing-library/jest-dom/vitest'

import { cleanDatabase } from '@/tests/mocks/data'
import { generateSeeds } from '@/tests/mocks/seeds'

import { server } from './mocks/node'

beforeAll(() => server.listen())

beforeEach(() => generateSeeds())

afterEach(() => {
  server.resetHandlers()

  cleanDatabase()
})

afterAll(() => server.close())
