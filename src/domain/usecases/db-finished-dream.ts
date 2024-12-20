import { HttpResponse } from '@/application/contracts'
import { FinishedDream } from '../contracts/repos'

export class DbFinishedDream implements FinishedDream {
  constructor(private readonly finishedDream: FinishedDream) {}

  async finished(id: string): Promise<FinishedDream.Result | HttpResponse> {
    return await this.finishedDream.finished(id)
  }
}
