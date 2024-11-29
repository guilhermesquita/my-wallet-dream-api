import { noContent } from '@/application/helpers'
import { CheckUserById, ListUserById } from '../contracts/repos'

export class DbListUserById implements ListUserById {
  constructor(
    private readonly ListUserById: ListUserById,
    private readonly checkUserById: CheckUserById
  ) {}

  async ListById(user: ListUserById.Params): Promise<ListUserById.Result> {
    const checkById = await this.checkUserById.CheckById(user.id)
    if (!checkById) {
      return noContent()
    }
    return await this.ListUserById.ListById(user)
  }
}
