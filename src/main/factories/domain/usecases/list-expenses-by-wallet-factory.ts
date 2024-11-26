import { ListExpensesByWallet } from '@/domain/contracts/repos'
import { DbListExpensesByWallet } from '@/domain/usecases'
import { ExpensesRepository } from '@/infra/repos/postgres'

export const makeDbListExpensesByWallet = (): ListExpensesByWallet => {
  const pgExpensesRepository = new ExpensesRepository()
  return new DbListExpensesByWallet(pgExpensesRepository)
}
