import { EditExpense } from '@/domain/contracts/repos'
import { DbEditExpense } from '@/domain/usecases'
import { ExpensesRepository } from '@/infra/repos/postgres'

export const makeDbEditExpense = (): EditExpense => {
  const pgExpenseRepository = new ExpensesRepository()
  return new DbEditExpense(pgExpenseRepository)
}
