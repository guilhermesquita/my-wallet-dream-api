import { ListWalletsByProfileId } from '../contracts/repos'

export class DbListWalletAllByProfileId implements ListWalletsByProfileId {
  constructor(private readonly listWalletAll: ListWalletsByProfileId) {}

  async listAll(idUser: string): Promise<ListWalletsByProfileId.Result> {
    return await this.listWalletAll.listAll(idUser)
  }
}
