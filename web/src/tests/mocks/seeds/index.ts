import { seedUsers } from '@/tests/mocks/seeds/users'

function generateSeeds(opts?: { users?: number }) {
  seedUsers({ total: opts?.users })
}

export { generateSeeds }
