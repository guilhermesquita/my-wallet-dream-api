// import { notAcceptable } from '@/application/helpers'
import { notAcceptable } from '@/application/helpers'
import { CheckUserById, EditUser } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbEditUser implements EditUser {
  constructor(
    private readonly EditUser: EditUser,
    private readonly checkUserExistsById: CheckUserById
  ) {}

  async edit(user: EditUser.Params): Promise<EditUser.Result | HttpResponse> {
    let idExists = false

    const checkUser = await this.checkUserExistsById.CheckById(user.id)

    checkUser ? (idExists = true) : (idExists = false)

    if (!idExists) {
      return notAcceptable('Usuário não encontrado')
    }

    return await this.EditUser.edit(user)
  }
}
