import { notAcceptable } from '@/application/helpers'
import { ListExpenseById, RemoveExpense } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbRemoveExpense implements RemoveExpense {
  constructor(
    private readonly removeExpense: RemoveExpense,
    private readonly listExpensesById: ListExpenseById
  ) {}

  async remove(id: string): Promise<RemoveExpense.Result | HttpResponse> {
    const expense = await this.listExpensesById.listById(id)
    if (!expense) {
      return notAcceptable('Gasto inexistente')
    }
    return await this.removeExpense.remove(id)
  }
}
