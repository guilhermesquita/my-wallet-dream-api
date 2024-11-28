import { RemoveWallet } from '../contracts/repos'

export class DbRemoveWallet implements RemoveWallet {
  constructor(private readonly removeWallet: RemoveWallet) {}

  async remove(id: number): Promise<RemoveWallet.Result> {
    return await this.removeWallet.remove(id)
  }
}
