import { RemoveExpense } from '@/domain/contracts/repos'
import { ok, serverError } from '../helpers'
import { Controller, HttpResponse } from '../contracts'

export class RemoveExpenseController implements Controller {
  constructor(private readonly removeExpense: RemoveExpense) {}
  async handle(
    request: RemoveExpenseController.Request
  ): Promise<HttpResponse> {
    try {
      const { id } = request
      const result = await this.removeExpense.remove(id)

      //   if ('statusCode' in result && result.statusCode === 406) {
      //     return notAcceptable(result.message)
      //   }

      //   if ('statusCode' in result && result.statusCode === 401) {
      //     return unauthorized()
      //   }

      return ok(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace RemoveExpenseController {
  export type Request = {
    id: string
  }
}
