import { ListUserById } from '@/domain/contracts/repos'
import { DbListUserById } from '@/domain/usecases'
import { PgUserRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbListUserById = (): ListUserById => {
  const pgUserRepository = new PgUserRepository(new RedisService())
  return new DbListUserById(pgUserRepository, pgUserRepository)
}
