import { UploadImageProfile } from '@/domain/contracts/repos'
import { DbUploadImgProfile } from '@/domain/usecases'
import { JwtTokenHandler } from '@/infra/gateways'
import { PgUserRepository } from '@/infra/repos/postgres'

export const makeUploadImgProfile = (): UploadImageProfile => {
  const userRepository = new PgUserRepository()
  return new DbUploadImgProfile(userRepository, new JwtTokenHandler())
}
