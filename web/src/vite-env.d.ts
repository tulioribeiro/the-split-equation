/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
  readonly VITE_ENABLE_API_MOCKING: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
