import { ListUserByEmail } from '../contracts/repos'

export class DbListUserByEmail implements ListUserByEmail {
  constructor(private readonly ListUserByEmail: ListUserByEmail) {}

  async ListByEmail(
    user: ListUserByEmail.Params
  ): Promise<ListUserByEmail.Result> {
    return await this.ListUserByEmail.ListByEmail(user)
  }
}
