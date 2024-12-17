import { EditDream } from '../contracts/repos'

export class DbEditDream implements EditDream {
  constructor(private readonly editDream: EditDream) {}
  async edit(params: EditDream.Params): Promise<EditDream.Result> {
    return await this.editDream.edit(params)
  }
}
