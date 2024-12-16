import { PaymentExpense } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { noContent, ok } from '../helpers'

export class PaymentExpenseController implements Controller {
  constructor(readonly paymentExpense: PaymentExpense) {}
  async handle(
    request: PaymentExpenseController.Request
  ): Promise<HttpResponse> {
    const result = await this.paymentExpense.payment(request.id)

    if ('statusCode' in result && result.statusCode === 406) {
      const message = result as HttpResponse
      return noContent(message.body)
    }

    return ok(result)
  }
}

export namespace PaymentExpenseController {
  export type Request = {
    id: string
  }
}
