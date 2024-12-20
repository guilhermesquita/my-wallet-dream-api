import { notAcceptable } from '@/application/helpers'
import { CheckDreamById, EditDream } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbEditDream implements EditDream {
  constructor(
    private readonly editDream: EditDream,
    private readonly checkDreamById: CheckDreamById
  ) {}

  async edit(
    params: EditDream.Params
  ): Promise<EditDream.Result | HttpResponse> {
    if (!(await this.checkDreamById.CheckById(params.id))) {
      return notAcceptable('Dream não encontrado!')
    }
    return await this.editDream.edit(params)
  }
}
