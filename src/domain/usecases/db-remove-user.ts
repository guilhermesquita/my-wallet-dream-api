import { unauthorized } from '@/application/helpers'
import { ListUserById, RemoveUser } from '../contracts/repos'
import { JwtTokenHandler } from '@/infra/gateways'
import { HttpResponse } from '@/application/contracts'

export class DbRemoveUser implements RemoveUser {
  constructor(
    private readonly removeUser: RemoveUser,
    private readonly checkUserExistsById: ListUserById,
    private readonly jwtTokenHandler: JwtTokenHandler
  ) {}

  async remove(
    user: RemoveUser.Params
  ): Promise<RemoveUser.Result | HttpResponse> {
    let idExists = false

    ;(await this.checkUserExistsById.ListById({
      id: user.id
    }))
      ? (idExists = true)
      : (idExists = false)

    if (!idExists) {
      return {
        id: user.id,
        statusCode: 406,
        message: 'Usuário não encontrado!'
      }
    }

    if (!user.token) {
      return unauthorized()
    }

    return await this.removeUser.remove(user)
  }
}
