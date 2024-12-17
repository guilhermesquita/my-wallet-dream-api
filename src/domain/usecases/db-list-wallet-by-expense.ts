import { ListWalletByExpense } from '../contracts/repos'

export class DbListWalletByExpense implements ListWalletByExpense {
  constructor(private readonly listWalletByExpense: ListWalletByExpense) {}

  async listByExpense(id: string): Promise<ListWalletByExpense.Result> {
    return await this.listWalletByExpense.listByExpense(id)
  }
}
