import { Controller } from '@/application/contracts'
import { EditDreamController } from '@/application/controllers'
import { makeDbEditDream } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'
import { makeEditDreamValidation } from './edit-dream-validation-factory'

export const makeEditDreamController = (): Controller => {
  const controller = new EditDreamController(
    makeDbEditDream(),
    makeEditDreamValidation()
  )
  return makePgTransactionController(controller)
}
