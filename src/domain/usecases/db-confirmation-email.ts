import { CheckConfirmaitonEmail, ConfirmationEmail } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbConfirmationEmail implements ConfirmationEmail {
  constructor(
    private readonly confirmationEmail: ConfirmationEmail,
    private readonly checkUserById: CheckConfirmaitonEmail
  ) {}

  async confirme(
    params: ConfirmationEmail.Params
  ): Promise<ConfirmationEmail.Result | HttpResponse> {
    const check = await this.checkUserById.checkConfirmation(params.id)

    if (check) {
      const erro = {
        statusCode: 204,
        message: 'Email Já confirmado!'
      }
      return erro
    }

    return await this.confirmationEmail.confirme(params)
  }
}
