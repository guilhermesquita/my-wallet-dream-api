import { ListWalletById } from '../contracts/repos'

export class DbListWalletById implements ListWalletById {
  constructor(private readonly ListWalletById: ListWalletById) {}

  async ListById(id: number): Promise<ListWalletById.Result> {
    return await this.ListWalletById.ListById(id)
  }
}
