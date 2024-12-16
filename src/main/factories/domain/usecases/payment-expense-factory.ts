import { PaymentExpense } from '@/domain/contracts/repos'
import { DbPaymentExpense } from '@/domain/usecases'
import { ExpensesRepository } from '@/infra/repos/postgres'

export const makeDbPaymentExpense = (): PaymentExpense => {
  const pgExpensesRepository = new ExpensesRepository()
  return new DbPaymentExpense(pgExpensesRepository, pgExpensesRepository)
}
