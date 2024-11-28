import { RemoveExpense } from '@/domain/contracts/repos'
import { DbRemoveExpense } from '@/domain/usecases'
import { ExpensesRepository } from '@/infra/repos/postgres'

export const makeDbRemoveExpense = (): RemoveExpense => {
  const pgExpenseRepo = new ExpensesRepository()
  return new DbRemoveExpense(pgExpenseRepo)
}
