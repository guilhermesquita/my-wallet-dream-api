import {
  badRequest,
  conflict,
  created,
  notAcceptable,
  serverError
} from '../helpers'
import { Controller, HttpResponse, Validation } from '../contracts'
import { EditDream } from '@/domain/contracts/repos'

export class EditDreamController implements Controller {
  constructor(
    private readonly editDream: EditDream,
    private readonly validation: Validation
  ) {}

  async handle(request: EditDreamController.Request): Promise<HttpResponse> {
    try {
      const erro = this.validation.validate(request)
      if (erro) {
        return badRequest(erro)
      }
      const { id, name, description, time_expection, value } = request
      const result = await this.editDream.edit({
        id,
        name,
        time_expection,
        description,
        value
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

export namespace EditDreamController {
  export type Request = {
    id: string
    name: string
    description: string
    time_expection: number
    value: number
  }
}
