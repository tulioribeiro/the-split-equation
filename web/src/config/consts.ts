import { APP_ENV } from './env'

const IS_MOCKING_ENABLED =
  APP_ENV.VITE_ENABLE_API_MOCKING && import.meta.env.DEV

const API_URL = IS_MOCKING_ENABLED ? '' : APP_ENV.VITE_APP_API_URL

const IS_DEV = import.meta.env.DEV
const IS_PROD = import.meta.env.PROD
const IS_TEST = import.meta.env.TEST

export { API_URL, IS_DEV, IS_PROD, IS_TEST }
