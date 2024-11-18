// import { notAcceptable } from '@/application/helpers'
import { EditWallet, ListWalletById } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbEditWallet implements EditWallet {
  constructor(
    private readonly EditWallet: EditWallet,
    private readonly checkUserExistsById: ListWalletById
  ) {}

  async edit(
    wallet: EditWallet.Params
  ): Promise<EditWallet.Result | HttpResponse> {
    // let idExists = false

    // ;(await this.checkWalletExistsById.ListById({
    //   id: Wallet.id
    // }))
    //   ? (idExists = true)
    //   : (idExists = false)

    // if (!idExists) {
    //   return notAcceptable('Usuário não encontrado')
    // }

    return await this.EditWallet.edit(wallet)
  }
}
