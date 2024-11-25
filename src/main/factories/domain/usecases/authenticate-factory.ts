import { Authenticate } from '@/domain/contracts/repos'
import { DbAuthenticate } from '@/domain/usecases'
import { PgUserRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbAuthenticate = (): Authenticate => {
  const pgUserRepository = new PgUserRepository(new RedisService())
  return new DbAuthenticate(pgUserRepository, pgUserRepository)
}
