import { AddUser } from '@/domain/contracts/repos'
import { DbAddUser } from '@/domain/usecases'
import { PgUserRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbAddUser = (): AddUser => {
  const pgUserRepository = new PgUserRepository(new RedisService())
  return new DbAddUser(pgUserRepository, pgUserRepository)
}
