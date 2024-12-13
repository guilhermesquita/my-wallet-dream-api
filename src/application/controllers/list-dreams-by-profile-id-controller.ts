import { ListDreamsByProfileId } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { noContent, ok, serverError } from '../helpers'

export class ListDreamsByProfileIdController implements Controller {
  constructor(private readonly listDreamsByProfileId: ListDreamsByProfileId) {}

  async handle(
    request: ListDreamsByProfileIdController.Request
  ): Promise<HttpResponse> {
    try {
      const result = (await this.listDreamsByProfileId.listAll(
        request.id
      )) as HttpResponse
      if ('statusCode' in result && result.statusCode === 204) {
        return noContent('Usuário não encontrado')
      }

      return ok(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace ListDreamsByProfileIdController {
  export type Request = {
    id: string
  }
}
