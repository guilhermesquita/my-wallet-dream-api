// import { notAcceptable } from '@/application/helpers'
import { conflict, notAcceptable } from '@/application/helpers'
import {
  CheckWalletByNameAndOwner,
  EditWallet,
  ListWalletById
} from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'
import { Wallet } from '../entities'

export class DbEditWallet implements EditWallet {
  constructor(
    private readonly EditWallet: EditWallet,
    private readonly checkWalletExistsById: ListWalletById,
    private readonly checkWalletName: CheckWalletByNameAndOwner
  ) {}

  async edit(
    wallet: EditWallet.Params
  ): Promise<EditWallet.Result | HttpResponse> {
    let idExists = false

    const walletById = (await this.checkWalletExistsById.ListById(
      wallet.id
    )) as Wallet

    walletById ? (idExists = true) : (idExists = false)

    if (!idExists) {
      return notAcceptable('Carteira não encontrado')
    }

    if (wallet.name) {
      const { name } = wallet
      const owner = walletById.fk_profile.id_profile
      if (
        await this.checkWalletName.checkByName({
          name,
          owner
        })
      ) {
        return conflict(
          'Carteira já existe com esse nome para esse proprietário'
        )
      }
    }

    return await this.EditWallet.edit(wallet)
  }
}
