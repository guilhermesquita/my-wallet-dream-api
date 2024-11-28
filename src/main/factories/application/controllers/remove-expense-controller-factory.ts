import { Controller } from '@/application/contracts'
import { RemoveExpenseController } from '@/application/controllers'
import { makeDbRemoveExpense } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'

export const makeRemoveExpenseController = (): Controller => {
  const controller = new RemoveExpenseController(makeDbRemoveExpense())
  return makePgTransactionController(controller)
}
