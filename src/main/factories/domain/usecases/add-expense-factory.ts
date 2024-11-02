import { AddExpense } from '@/domain/contracts/repos'
import { DbAddExpense } from '@/domain/usecases'
import { ExpensesRepository, PgWalletRepository } from '@/infra/repos/postgres'

export const makeDbAddExpense = (): AddExpense => {
  const expenseRepository = new ExpensesRepository()
  const walletRepository = new PgWalletRepository()
  return new DbAddExpense(expenseRepository, walletRepository)
}
