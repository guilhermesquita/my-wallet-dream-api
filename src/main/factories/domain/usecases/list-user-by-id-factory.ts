import { ListUserById } from '@/domain/contracts/repos'
import { DbListUserById } from '@/domain/usecases'
import { JwtTokenHandler } from '@/infra/gateways'
import { RedisPgUserRepository } from '@/infra/repos/postgres/redis-user-repository'
import { RedisService } from '@/main/config/redis'

export const makeDbListUserById = (): ListUserById => {
  const pgRedisUserRepository = new RedisPgUserRepository(new RedisService())
  return new DbListUserById(pgRedisUserRepository, new JwtTokenHandler())
}
