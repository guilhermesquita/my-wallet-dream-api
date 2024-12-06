import { ListExpensesByWallet } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { notAcceptable, ok } from '../helpers'

export class ListExpensesByWalletController implements Controller {
  constructor(readonly listExpensesByWallet: ListExpensesByWallet) {}
  async handle(
    request: ListExpensesByWalletController.Request
  ): Promise<HttpResponse> {
    const result = await this.listExpensesByWallet.listByWallet(
      request.walletId
    )

    if ('statusCode' in result && result.statusCode === 406) {
      const message = result
      return notAcceptable(message.body)
    }

    return ok(result)
  }
}

export namespace ListExpensesByWalletController {
  export type Request = {
    walletId: number
  }
}
