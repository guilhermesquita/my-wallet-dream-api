import { badRequest, created, notAcceptable, serverError } from '../helpers'
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

      if (result.statusCode === 406) {
        const message = result as HttpResponse
        return notAcceptable(message.body)
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
