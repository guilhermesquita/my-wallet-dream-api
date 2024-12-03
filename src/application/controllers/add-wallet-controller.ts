import { AddWallet } from '@/domain/contracts/repos'
import {
  badRequest,
  conflict,
  created,
  notAcceptable,
  serverError
} from '../helpers'
import { Controller, HttpResponse, Validation } from '../contracts'

export class AddWalletController implements Controller {
  constructor(
    private readonly addWallet: AddWallet,
    private readonly validation: Validation
  ) {}

  async handle(request: AddWalletController.Request): Promise<HttpResponse> {
    try {
      const erro = this.validation.validate(request)
      if (erro) {
        return badRequest(erro)
      }
      const {
        name,
        total_price,
        owner,
        is_public,
        description,
        authorization
      } = request
      const result = await this.addWallet.add({
        name,
        total_price,
        owner,
        description,
        is_public,
        token: authorization
      })

      if ('statusCode' in result && result.statusCode === 406) {
        return notAcceptable('usuário não encontrado!')
      }

      if ('statusCode' in result && result.statusCode === 409) {
        // console.log(result instanceof notAcceptable)
        return conflict('Carteira com nome')
      }

      return created(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace AddWalletController {
  export type Request = {
    name: string
    total_price: number
    owner: string
    is_public: boolean
    description: string
    authorization: string
  }
}
