import { Controller } from '@/application/contracts'
import { makePgTransactionController } from '../decorators'
import { makeUploadImgProfile } from '../../domain/usecases'
import { UploadImageProfileController } from '@/application/controllers'

export const makeUploadImgProfileController = (): Controller => {
  const controller = new UploadImageProfileController(makeUploadImgProfile())
  return makePgTransactionController(controller)
}
