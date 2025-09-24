import { create, type StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { IS_DEV } from '@/config/consts'

export const createStore = <T>(creator: StateCreator<T>, storeName: string) => {
  if (IS_DEV) {
    return create(devtools(creator, { name: storeName }))
  }

  return create(creator)
}
