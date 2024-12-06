import { notAcceptable } from '@/application/helpers'
import { ListExpensesByWallet, ListWalletById } from '../contracts/repos'

export class DbListExpensesByWallet implements ListExpensesByWallet {
  constructor(
    private readonly listExpensesByWallet: ListExpensesByWallet,
    private readonly ListWalletById: ListWalletById
  ) {}

  async listByWallet(id_wallet: number): Promise<ListExpensesByWallet.Result> {
    const wallet = await this.ListWalletById.ListById(id_wallet)
    if (!wallet) {
      return notAcceptable('Carteira inexistente')
    }
    return await this.listExpensesByWallet.listByWallet(id_wallet)
  }
}
