import { EditUser } from '@/domain/contracts/repos'
import { DbEditUser } from '@/domain/usecases'
import { PgUserRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbEditUser = (): EditUser => {
  const pgUserRepository = new PgUserRepository(new RedisService())
  return new DbEditUser(pgUserRepository, pgUserRepository)
}
