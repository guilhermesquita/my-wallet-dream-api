import { AddExpense } from '@/domain/contracts/repos'
import { Controller, HttpResponse, Validation } from '../contracts'
import { badRequest, ok, serverError } from '../helpers'

export class AddExpenseController implements Controller {
  constructor(
    private readonly addExpense: AddExpense,
    private readonly validation: Validation
  ) {}

  async handle(request: AddExpenseController.Request): Promise<HttpResponse> {
    try {
      const erro = this.validation.validate(request)
      if (erro) {
        return badRequest(erro)
      }
      const result = await this.addExpense.add(request)
      return ok(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace AddExpenseController {
  export type Request = {
    name: string
    value: number
    fk_wallet: number
  }
}
