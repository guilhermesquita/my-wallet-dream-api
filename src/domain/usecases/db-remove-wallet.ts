import { notAcceptable } from '@/application/helpers'
import { ListWalletById, RemoveWallet } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbRemoveWallet implements RemoveWallet {
  constructor(
    private readonly removeWallet: RemoveWallet,
    private readonly ListWalletById: ListWalletById
  ) {}

  async remove(id: number): Promise<RemoveWallet.Result | HttpResponse> {
    const wallet = await this.ListWalletById.ListById(id)
    if (!wallet) {
      return notAcceptable()
    }
    return await this.removeWallet.remove(id)
  }
}
