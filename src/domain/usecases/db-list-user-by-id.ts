import { JwtTokenHandler } from '@/infra/gateways'
import { ListUserById } from '../contracts/repos'

export class DbListUserById implements ListUserById {
  constructor(
    private readonly ListUserById: ListUserById,
    private readonly jwtTokenHandler: JwtTokenHandler
  ) {}

  async ListById(user: ListUserById.Params): Promise<ListUserById.Result> {
    // if (!user.token) {
    //   return forbidden(new AccessDeniedError())
    // }

    // const checkById = await this.ListUserById.ListById(user)
    // if (!checkById) {
    //   return noContent()
    // }

    // const auth = user.token.split(' ')[1]
    // const idValidate = await this.jwtTokenHandler.validate({ token: auth })

    // if (!this.ListUserById.ListById({ id: idValidate, token: auth })) {
    //   return unauthorized()
    // }

    return await this.ListUserById.ListById(user)
  }
}
