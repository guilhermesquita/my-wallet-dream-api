import { noContent } from '@/application/helpers'
import { ListWalletById } from '../contracts/repos'

export class DbListWalletById implements ListWalletById {
  constructor(private readonly ListWalletById: ListWalletById) {}

  async ListById(id: number): Promise<ListWalletById.Result> {
    const wallet = await this.ListWalletById.ListById(id)
    if (!wallet) {
      return noContent()
    }
    return await this.ListWalletById.ListById(id)
  }
}
