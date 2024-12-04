import { ListWalletsByProfileId } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { noContent, ok, serverError } from '../helpers'

export class ListWalletsByProfileIdController implements Controller {
  constructor(
    private readonly listWalletsByProfileId: ListWalletsByProfileId
  ) {}

  async handle(
    request: ListWalletsByProfileIdController.Request
  ): Promise<HttpResponse> {
    try {
      const result = (await this.listWalletsByProfileId.listAll(
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

export namespace ListWalletsByProfileIdController {
  export type Request = {
    id: string
  }
}
