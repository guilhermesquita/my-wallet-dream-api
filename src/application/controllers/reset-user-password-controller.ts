// import { ResetUserPassword } from '@/domain/contracts/repos'
import { badRequest, created, notAcceptable, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../contracts'
import { ResetUserPassword } from '@/domain/contracts/repos'

export class ResetUserPasswordController implements Controller {
  constructor(
    private readonly resetUserPassword: ResetUserPassword,
    private readonly validation: Validation
  ) {}

  async handle(
    request: ResetUserPasswordController.Request
  ): Promise<HttpResponse> {
    try {
      const erro = this.validation.validate(request)
      if (erro) {
        return badRequest(erro)
      }
      const { password, email } = request
      const result = await this.resetUserPassword.reset({ password, email })
      if ('statusCode' in result && result.statusCode === 406) {
        const message = result as HttpResponse
        return notAcceptable(message.body)
      }
      return created(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace ResetUserPasswordController {
  export type Request = {
    password: string
    email: string
  }
}
