import { RemoveWallet } from '@/domain/contracts/repos'
import { ok, serverError } from '../helpers'
import { Controller, HttpResponse } from '../contracts'

export class RemoveWalletController implements Controller {
  constructor(private readonly removeWallet: RemoveWallet) {}
  async handle(request: RemoveWalletController.Request): Promise<HttpResponse> {
    try {
      const { id } = request
      const result = await this.removeWallet.remove(id)

      //   if ('statusCode' in result && result.statusCode === 406) {
      //     return notAcceptable(result.message)
      //   }

      //   if ('statusCode' in result && result.statusCode === 401) {
      //     return unauthorized()
      //   }

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
