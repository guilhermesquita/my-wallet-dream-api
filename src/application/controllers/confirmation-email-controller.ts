/* eslint-disable @typescript-eslint/lines-between-class-members */
import { ConfirmationEmail } from '@/domain/contracts/repos'
import { created, noContent, serverError } from '../helpers'
import { Controller, HttpResponse } from '../contracts'

export class ConfirmationEmailController implements Controller {
  constructor(private readonly confirmationEmail: ConfirmationEmail) {}
  async handle(
    request: ConfirmationEmailController.Request
  ): Promise<HttpResponse> {
    try {
      const { id } = request
      const result = await this.confirmationEmail.confirme({ id })

      if ('statusCode' in result && result.statusCode === 204) {
        return noContent()
      }

      return created(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace ConfirmationEmailController {
  export type Request = {
    id: string
  }
}
