import { ListExpensesByWallet } from '../contracts/repos'

export class DbListExpensesByWallet implements ListExpensesByWallet {
  constructor(private readonly listExpensesByWallet: ListExpensesByWallet) {}
  async listByWallet(id_wallet: number): Promise<ListExpensesByWallet.Result> {
    return await this.listExpensesByWallet.listByWallet(id_wallet)
  }
}
