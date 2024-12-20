import { FinishedDream } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { noContent, ok } from '../helpers'

export class FinishedDreamController implements Controller {
  constructor(readonly finishedDream: FinishedDream) {}
  async handle(
    request: FinishedDreamController.Request
  ): Promise<HttpResponse> {
    const result = await this.finishedDream.finished(request.id)

    if ('statusCode' in result && result.statusCode === 406) {
      const message = result as HttpResponse
      return noContent(message.body)
    }

    return ok(result)
  }
}

export namespace FinishedDreamController {
  export type Request = {
    id: string
  }
}
