import { notAcceptable } from '@/application/helpers'
import { CheckDreamById, RemoveDream } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbRemoveDream implements RemoveDream {
  constructor(
    private readonly removeDream: RemoveDream,
    private readonly checkDreamById: CheckDreamById
  ) {}

  async remove(id: string): Promise<RemoveDream.Result | HttpResponse> {
    if (!(await this.checkDreamById.CheckById(id))) {
      return notAcceptable('Dream não encontrado!')
    }
    return await this.removeDream.remove(id)
  }
}
