import { HttpResponse } from '@/application/contracts'
import { CheckUserById, ListDreamsByProfileId } from '../contracts/repos'
import { noContent } from '@/application/helpers'

export class DbListDreamsAllByProfileId implements ListDreamsByProfileId {
  constructor(
    private readonly listDreamAll: ListDreamsByProfileId,
    private readonly checkUserById: CheckUserById
  ) {}

  async listAll(
    idUser: string
  ): Promise<ListDreamsByProfileId.Result | HttpResponse> {
    if (!(await this.checkUserById.CheckById(idUser))) {
      return noContent()
    }
    return await this.listDreamAll.listAll(idUser)
  }
}
