import { ResetUserPassword } from '@/domain/contracts/repos'
import { DbResetUserPassword } from '@/domain/usecases'
import { PgUserRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbResetUserPassword = (): ResetUserPassword => {
  const pgUserRepository = new PgUserRepository(new RedisService())
  return new DbResetUserPassword(pgUserRepository, pgUserRepository)
}
