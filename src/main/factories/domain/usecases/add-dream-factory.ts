import { AddDream } from '@/domain/contracts/repos'
import { DbAddDream } from '@/domain/usecases'
import { DreamRepository, PgUserRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbAddDream = (): AddDream => {
  const dreamRepository = new DreamRepository()
  const userRepository = new PgUserRepository(new RedisService())
  return new DbAddDream(dreamRepository, userRepository)
}
