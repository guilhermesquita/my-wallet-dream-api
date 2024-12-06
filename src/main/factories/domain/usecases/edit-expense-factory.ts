import { EditExpense } from '@/domain/contracts/repos'
import { DbEditExpense } from '@/domain/usecases'
import { ExpensesRepository, PgWalletRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbEditExpense = (): EditExpense => {
  const pgExpenseRepository = new ExpensesRepository()
  const pgWalletRepository = new PgWalletRepository(new RedisService())
  return new DbEditExpense(
    pgExpenseRepository,
    pgExpenseRepository,
    pgWalletRepository
  )
}
