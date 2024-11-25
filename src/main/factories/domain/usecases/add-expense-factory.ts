import { AddExpense } from '@/domain/contracts/repos'
import { DbAddExpense } from '@/domain/usecases'
import { ExpensesRepository, PgWalletRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbAddExpense = (): AddExpense => {
  const expenseRepository = new ExpensesRepository()
  const walletRepository = new PgWalletRepository(new RedisService())
  return new DbAddExpense(expenseRepository, walletRepository)
}
