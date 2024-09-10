import { UploadImageProfile } from '@/domain/contracts/repos'
import { DbUploadImgProfile } from '@/domain/usecases'
import { PgUserRepository } from '@/infra/repos/postgres'

export const makeUploadImgProfile = (): UploadImageProfile => {
  const userRepository = new PgUserRepository()
  return new DbUploadImgProfile(userRepository)
}
