import { HttpResponse } from '@/application/contracts'
import { Authenticate, CheckConfirmaitonEmail } from '../contracts/repos'
import { notAcceptable } from '@/application/helpers'

export class DbAuthenticate implements Authenticate {
  constructor(
    private readonly authenticate: Authenticate,
    private readonly checkEmail: CheckConfirmaitonEmail
  ) {}

  async auth(
    params: Authenticate.Params
  ): Promise<Authenticate.Result | boolean | HttpResponse> {
    const authentication = await this.authenticate.auth(params)
    if (!authentication) {
      return notAcceptable('Email ou senha incorreta')
    }

    // if (!(await this.checkEmail.checkConfirmation(params.email))) {
    //   return forbidden({
    //     message: 'Confirme seu email!',
    //     name: 'email not confirmed'
    //   })
    // }

    return authentication
  }
}
