import { notAcceptable } from '@/application/helpers'
import { CheckUserByEmail, ResetUserPassword } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbResetUserPassword implements ResetUserPassword {
  constructor(
    private readonly ResetUserPassword: ResetUserPassword,
    private readonly checkUserByEmail: CheckUserByEmail
  ) {}

  async reset(
    user: ResetUserPassword.Params
  ): Promise<ResetUserPassword.Result | HttpResponse> {
    const userExists = await this.checkUserByEmail.check(user.email)
    if (!userExists) {
      return notAcceptable('Email não cadastrado')
    }
    return await this.ResetUserPassword.reset(user)
  }
}
