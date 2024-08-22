import { AddUser } from '@/domain/contracts/repos'
import { badRequest, created, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../contracts'

export class AddUserController implements Controller {
  constructor(
    private readonly addUser: AddUser,
    private readonly validation: Validation
  ) {}

  async handle(request: AddUserController.Request): Promise<HttpResponse> {
    try {
      const erro = this.validation.validate(request)
      if (erro) {
        return badRequest(erro)
      }
      const { username, email, password, img_profile } = request
      const result = await this.addUser.add({
        name_profile: username,
        email_user: email,
        emailConfirmed: false,
        encrypted_password: password,
        img_profile
      })

      return created(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace AddUserController {
  export type Request = {
    username: string
    email: string
    password: string
    img_profile: string
  }
}
