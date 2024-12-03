import { HttpResponse } from '@/application/contracts'
import {
  AddWallet,
  CheckUserById,
  CheckWalletByNameAndOwner
} from '../contracts/repos'
import { conflict, notAcceptable } from '@/application/helpers'

export class DbAddWallet implements AddWallet {
  constructor(
    private readonly addWallet: AddWallet,
    private readonly checkWalletName: CheckWalletByNameAndOwner,
    private readonly checkUserExists: CheckUserById
  ) {}

  async add(
    wallet: AddWallet.Params
  ): Promise<AddWallet.Result | HttpResponse> {
    const { name } = wallet
    const owner = wallet.owner as string

    if (!(await this.checkUserExists.CheckById(owner))) {
      return notAcceptable('Usuário não encontrado')
    }
    if (
      await this.checkWalletName.checkByName({
        name,
        owner
      })
    ) {
      return conflict('Carteira já existe com esse nome para esse proprietário')
    }
    return await this.addWallet.add(wallet)
  }
}
