import { RemoveWallet } from '@/domain/contracts/repos'
import { notAcceptable, ok, serverError } from '../helpers'
import { Controller, HttpResponse } from '../contracts'

export class RemoveWalletController implements Controller {
  constructor(private readonly removeWallet: RemoveWallet) {}
  async handle(request: RemoveWalletController.Request): Promise<HttpResponse> {
    try {
      const { id } = request
      const result = await this.removeWallet.remove(id)

      if ('statusCode' in result && result.statusCode === 406) {
        return notAcceptable(result.message)
      }

      return ok(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace RemoveWalletController {
  export type Request = {
    id: number
  }
}
