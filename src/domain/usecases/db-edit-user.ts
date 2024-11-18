// import { notAcceptable } from '@/application/helpers'
import { EditUser, ListUserById } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbEditUser implements EditUser {
  constructor(
    private readonly EditUser: EditUser,
    private readonly checkUserExistsById: ListUserById
  ) {}

  async edit(user: EditUser.Params): Promise<EditUser.Result | HttpResponse> {
    // let idExists = false

    // ;(await this.checkUserExistsById.ListById({
    //   id: user.id
    // }))
    //   ? (idExists = true)
    //   : (idExists = false)

    // if (!idExists) {
    //   return notAcceptable('Usuário não encontrado')
    // }

    return await this.EditUser.edit(user)
  }
}
