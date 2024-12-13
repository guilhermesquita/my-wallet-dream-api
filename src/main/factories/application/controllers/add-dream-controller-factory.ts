import { AddDreamController } from '@/application/controllers'
import { makeDbAddDream } from '../../domain/usecases'
import { Controller } from '@/application/contracts'
import { makePgTransactionController } from '../decorators'
import { makeAddDreamValidation } from './add-dream-validation-factory'

export const makeAddDreamController = (): Controller => {
  const controller = new AddDreamController(
    makeDbAddDream(),
    makeAddDreamValidation()
  )

  return makePgTransactionController(controller)
}
