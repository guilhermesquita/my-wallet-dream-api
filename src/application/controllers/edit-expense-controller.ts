import { badRequest, created, notAcceptable, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../contracts'
import { EditExpense } from '@/domain/contracts/repos'

export class EditExpenseController implements Controller {
  constructor(
    private readonly editExpense: EditExpense,
    private readonly validation: Validation
  ) {}

  async handle(request: EditExpenseController.Request): Promise<HttpResponse> {
    try {
      const erro = this.validation.validate(request)
      if (erro) {
        return badRequest(erro)
      }
      const { id, name, value } = request
      const result = await this.editExpense.edit({
        id,
        name,
        value
      })

      if ('statusCode' in result && result.statusCode === 406) {
        return notAcceptable(result.message)
      }

      //   if ('statusCode' in result && result.statusCode === 401) {
      //     return unauthorized()
      //   }

      return created(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace EditExpenseController {
  export type Request = {
    id: string
    name: string
    value: number
  }
}
