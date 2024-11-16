import { ListWalletById } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { noContent, ok, serverError } from '../helpers'

export class ListWalletByIdController implements Controller {
  constructor(private readonly listWalletById: ListWalletById) {}

  async handle(
    request: ListWalletByIdController.Request
  ): Promise<HttpResponse> {
    try {
      const result = (await this.listWalletById.ListById(
        request.id
      )) as HttpResponse
      if ('statusCode' in result && result.statusCode === 204) {
        return noContent()
      }

      return ok(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace ListWalletByIdController {
  export type Request = {
    id: number
  }
}
