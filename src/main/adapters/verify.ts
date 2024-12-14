import { PgUserRepository } from '@/infra/repos/postgres'
import { RedisService } from '../config/redis'
import { DbListUserById } from '@/domain/usecases'

const pgUserRepository = new PgUserRepository(new RedisService())
const dbListUserById = new DbListUserById(pgUserRepository, pgUserRepository)

interface validationTokenParams {
  id: string
  url: string
  method: string
  tokenPayload: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUserByToken = async (id: string) => {
  const user = await dbListUserById.ListById({
    id
  })
  return user
}

export const validationsTokenUser = async ({
  id,
  tokenPayload,
  url,
  method
}: validationTokenParams): Promise<boolean> => {
  let valid = true
  if (url.includes('/api/users/')) {
    switch (method) {
      case 'PUT':
        if (tokenPayload !== id) {
          valid = false
        }
        break
      case 'PATCH':
        if (tokenPayload !== id) {
          valid = false
        }
        break
    }
  }

  if (url.includes('/api/users/upload')) {
    if (tokenPayload !== id) {
      return (valid = false)
    }
  }

  if (url.includes('/api/users/email')) {
    if (tokenPayload !== id) {
      return (valid = false)
    }
  }

  return valid
}
