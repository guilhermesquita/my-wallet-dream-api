import { ListExpenseById } from '@/domain/contracts/repos'
import { DbListExpenseById } from '@/domain/usecases'
import { ExpensesRepository } from '@/infra/repos/postgres'

export const makeDbListExpenseById = (): ListExpenseById => {
  const pgExpensesRepository = new ExpensesRepository()
  return new DbListExpenseById(pgExpensesRepository)
}
