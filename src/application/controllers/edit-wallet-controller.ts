import {
  badRequest,
  conflict,
  created,
  notAcceptable,
  serverError
} from '../helpers'
import { Controller, HttpResponse, Validation } from '../contracts'
import { EditWallet } from '@/domain/contracts/repos'

export class EditWalletController implements Controller {
  constructor(
    private readonly editWallet: EditWallet,
    private readonly validation: Validation
  ) {}

  async handle(request: EditWalletController.Request): Promise<HttpResponse> {
    try {
      const erro = this.validation.validate(request)
      if (erro) {
        return badRequest(erro)
      }
      const { id, name, total_price, is_public, description } = request
      const result = await this.editWallet.edit({
        id,
        name,
        total_price,
        is_public,
        description
      })

      if ('statusCode' in result && result.statusCode === 406) {
        return notAcceptable('Carteira não encontrada')
      }

      if ('statusCode' in result && result.statusCode === 409) {
        return conflict('Carteira com nome')
      }

      return created(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace EditWalletController {
  export type Request = {
    id: number
    name: string
    total_price: number
    is_public: boolean
    description: string
  }
}
