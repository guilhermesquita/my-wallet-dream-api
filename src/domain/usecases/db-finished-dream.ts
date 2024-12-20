import { HttpResponse } from '@/application/contracts'
import { CheckDreamById, FinishedDream } from '../contracts/repos'
import { notAcceptable } from '@/application/helpers'

export class DbFinishedDream implements FinishedDream {
  constructor(
    private readonly finishedDream: FinishedDream,
    private readonly checkDreamById: CheckDreamById
  ) {}

  async finished(id: string): Promise<FinishedDream.Result | HttpResponse> {
    if (!(await this.checkDreamById.CheckById(id))) {
      return notAcceptable('Dream não encontrado!')
    }
    return await this.finishedDream.finished(id)
  }
}
