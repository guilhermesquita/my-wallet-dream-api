import { noContent } from '@/application/helpers'
import { ListExpenseById } from '../contracts/repos'

export class DbListExpenseById implements ListExpenseById {
  constructor(private readonly listExpensesById: ListExpenseById) {}
  async listById(id: string): Promise<ListExpenseById.Result> {
    const expense = await this.listExpensesById.listById(id)
    if (!expense) {
      return noContent()
    }
    return expense
  }
}
