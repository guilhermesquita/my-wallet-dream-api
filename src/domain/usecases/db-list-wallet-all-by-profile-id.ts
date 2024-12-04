import { HttpResponse } from '@/application/contracts'
import { CheckUserById, ListWalletsByProfileId } from '../contracts/repos'
import { noContent } from '@/application/helpers'

export class DbListWalletAllByProfileId implements ListWalletsByProfileId {
  constructor(
    private readonly listWalletAll: ListWalletsByProfileId,
    private readonly checkUserById: CheckUserById
  ) {}

  async listAll(
    idUser: string
  ): Promise<ListWalletsByProfileId.Result | HttpResponse> {
    if (!(await this.checkUserById.CheckById(idUser))) {
      return noContent()
    }
    return await this.listWalletAll.listAll(idUser)
  }
}
