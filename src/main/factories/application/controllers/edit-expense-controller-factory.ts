import { Controller } from '@/application/contracts'
import { makeDbEditExpense } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'
import { EditExpenseController } from '@/application/controllers/edit-expense-controller'
import { makeEditExpenseValidation } from './edit-expense-validation-factory'

export const makeEditExpenseController = (): Controller => {
  const controller = new EditExpenseController(
    makeDbEditExpense(),
    makeEditExpenseValidation()
  )
  return makePgTransactionController(controller)
}
