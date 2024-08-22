import { Controller } from '@/application/contracts'
import { ConfirmationEmailController } from '@/application/controllers'
import { makePgTransactionController } from '../decorators'
import { makeDbConfirmationEmailFactory } from '../../domain/usecases'

export const makeConfirmationEmailController = (): Controller => {
  const controller = new ConfirmationEmailController(
    makeDbConfirmationEmailFactory()
  )
  return makePgTransactionController(controller)
}
