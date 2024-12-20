import { ListExpenseById } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { noContent, ok } from '../helpers'

export class ListExpenseByIdController implements Controller {
  constructor(readonly listExpenseById: ListExpenseById) {}
  async handle(
    request: ListExpenseByIdController.Request
  ): Promise<HttpResponse> {
    const result = await this.listExpenseById.listById(request.id)

    if ('statusCode' in result && result.statusCode === 204) {
      return noContent()
    }

    return ok(result)
  }
}

export namespace ListExpenseByIdController {
  export type Request = {
    id: string
  }
}
