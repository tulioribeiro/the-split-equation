import { faker } from '@faker-js/faker'

import { db } from '@/tests/mocks/data'

function seedUsers({ total = 0 }: { total?: number }) {
  db.user.create({
    id: faker.string.uuid(),
    name: 'Admin User',
    password: 'hardpassword',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: faker.date.past().toISOString(),
  })

  db.user.create({
    id: faker.string.uuid(),
    name: 'Regular User',
    password: 'hardpassword',
    email: 'user@example.com',
    role: 'user',
    createdAt: faker.date.past().toISOString(),
  })

  if (total > 0) {
    Array.from({ length: total }).forEach(() => {
      db.user.create({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        password: faker.string.alphanumeric(10),
        email: faker.internet.email(),
        role: 'user',
        createdAt: faker.date.past().toISOString(),
      })
    })
  }
}

export { seedUsers }
