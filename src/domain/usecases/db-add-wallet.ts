import { HttpResponse } from '@/application/contracts'
import { AddWallet } from '../contracts/repos'

export class DbAddWallet implements AddWallet {
  constructor(private readonly addWallet: AddWallet) {}
  async add(
    wallet: AddWallet.Params
  ): Promise<AddWallet.Result | HttpResponse> {
    return await this.addWallet.add(wallet)
  }
}
