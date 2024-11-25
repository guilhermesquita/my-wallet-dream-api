import { UploadImageProfile } from '@/domain/contracts/repos'
import { DbUploadImgProfile } from '@/domain/usecases'
import { JwtTokenHandler } from '@/infra/gateways'
import { PgUserRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeUploadImgProfile = (): UploadImageProfile => {
  const userRepository = new PgUserRepository(new RedisService())
  return new DbUploadImgProfile(userRepository, new JwtTokenHandler())
}
