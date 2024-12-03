import { EditUser } from '@/domain/contracts/repos'
import { badRequest, created, notAcceptable, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../contracts'

export class EditUserController implements Controller {
  constructor(
    private readonly editUser: EditUser,
    private readonly validation: Validation
  ) {}

  async handle(request: EditUserController.Request): Promise<HttpResponse> {
    try {
      const erro = this.validation.validate(request)
      if (erro) {
        return badRequest(erro)
      }
      const { id, username, email, password } = request
      const result = await this.editUser.edit({
        id,
        username,
        email,
        password
      })

      if ('statusCode' in result && result.statusCode === 406) {
        return notAcceptable(result.message)
      }

      return created(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace EditUserController {
  export type Request = {
    id: string
    username: string
    email: string
    password: string
  }
}
