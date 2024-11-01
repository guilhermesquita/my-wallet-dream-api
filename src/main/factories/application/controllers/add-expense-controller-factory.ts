import { AddExpenseController } from '@/application/controllers'
import { makeDbAddExpense } from '../../domain/usecases'
import { Controller } from '@/application/contracts'
import { makePgTransactionController } from '../decorators'
import { makeAddExpenseValidation } from './add-expense-validation-factory'

export const makeAddExpenseController = (): Controller => {
  const controller = new AddExpenseController(
    makeDbAddExpense(),
    makeAddExpenseValidation()
  )

  return makePgTransactionController(controller)
}
