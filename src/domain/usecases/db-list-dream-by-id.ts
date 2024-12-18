import { ListDreamById } from '../contracts/repos'

export class DbListDreamById implements ListDreamById {
  constructor(private readonly listDreamAll: ListDreamById) {}

  async listById(idUser: string): Promise<ListDreamById.Result> {
    return await this.listDreamAll.listById(idUser)
  }
}
