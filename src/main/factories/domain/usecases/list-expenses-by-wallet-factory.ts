import { ListExpensesByWallet } from '@/domain/contracts/repos'
import { DbListExpensesByWallet } from '@/domain/usecases'
import { ExpensesRepository, PgWalletRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbListExpensesByWallet = (): ListExpensesByWallet => {
  const pgExpensesRepository = new ExpensesRepository()
  const pgWalletRepository = new PgWalletRepository(new RedisService())
  return new DbListExpensesByWallet(pgExpensesRepository, pgWalletRepository)
}
