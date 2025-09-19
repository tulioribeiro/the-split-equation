import { APP_ENV } from './env'

const API_URL = APP_ENV.VITE_APP_API_URL

const IS_DEV = import.meta.env.DEV
const IS_PROD = import.meta.env.PROD
const IS_TEST = import.meta.env.TEST

export { API_URL, IS_DEV, IS_PROD, IS_TEST }
