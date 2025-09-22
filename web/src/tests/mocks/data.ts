import { factory, primaryKey } from '@mswjs/data'

const db = factory({
  user: {
    id: primaryKey(String),
    name: String,
    password: String,
    email: String,
    role: String,
    createdAt: String,
  },
})

function cleanDatabase() {
  for (const model of Object.values(db)) {
    model.deleteMany({ where: {} })
  }
}

export { cleanDatabase, db }
