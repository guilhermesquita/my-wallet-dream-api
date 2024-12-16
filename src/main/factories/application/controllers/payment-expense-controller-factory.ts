import { Controller } from '@/application/contracts'
import { PaymentExpenseController } from '@/application/controllers'
import { makeDbPaymentExpense } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'

export const makePaymentExpenseController = (): Controller => {
  const controller = new PaymentExpenseController(makeDbPaymentExpense())
  return makePgTransactionController(controller)
}
