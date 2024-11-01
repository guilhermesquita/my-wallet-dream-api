import { AddExpense } from '@/domain/contracts/repos'
import { DbAddExpense } from '@/domain/usecases'
import { ExpensesRepository } from '@/infra/repos/postgres'

export const makeDbAddExpense = (): AddExpense => {
  const expenseRepository = new ExpensesRepository()
  return new DbAddExpense(expenseRepository)
}
