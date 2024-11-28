import { ListExpenseById } from '../contracts/repos'

export class DbListExpenseById implements ListExpenseById {
  constructor(private readonly listExpensesById: ListExpenseById) {}
  async listById(id: string): Promise<ListExpenseById.Result> {
    return await this.listExpensesById.listById(id)
  }
}
