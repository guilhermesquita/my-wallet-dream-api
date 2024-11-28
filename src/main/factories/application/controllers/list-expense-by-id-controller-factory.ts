import { Controller } from '@/application/contracts'
import { makeDbListExpenseById } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'
import { ListExpenseByIdController } from '@/application/controllers'

export const makeListExpenseById = (): Controller => {
  const controller = new ListExpenseByIdController(makeDbListExpenseById())
  return makePgTransactionController(controller)
}
