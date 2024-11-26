import { ListExpensesByWallet } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { ok } from '../helpers'

export class ListExpensesByWalletController implements Controller {
  constructor(readonly listExpensesByWallet: ListExpensesByWallet) {}
  async handle(
    request: ListExpensesByWalletController.Request
  ): Promise<HttpResponse> {
    const result = await this.listExpensesByWallet.listByWallet(
      request.walletId
    )

    return ok(result)
  }
}

export namespace ListExpensesByWalletController {
  export type Request = {
    walletId: number
  }
}
