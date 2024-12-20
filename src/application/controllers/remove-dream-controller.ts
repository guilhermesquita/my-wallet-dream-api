import { created, notAcceptable, serverError } from '../helpers'
import { Controller, HttpResponse } from '../contracts'
import { RemoveDream } from '@/domain/contracts/repos'

export class RemoveDreamController implements Controller {
  constructor(private readonly removeDream: RemoveDream) {}

  async handle(request: RemoveDreamController.Request): Promise<HttpResponse> {
    try {
      const { id } = request
      const result = await this.removeDream.remove(id)

      if (result.statusCode === 406) {
        const message = result as HttpResponse
        return notAcceptable(message.body)
      }

      return created(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace RemoveDreamController {
  export type Request = {
    id: string
  }
}
