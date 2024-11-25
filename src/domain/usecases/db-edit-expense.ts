// import { notAcceptable } from '@/application/helpers'
import { EditExpense } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbEditExpense implements EditExpense {
  constructor(private readonly editExpense: EditExpense) {}

  async edit(
    expense: EditExpense.Params
  ): Promise<EditExpense.Result | HttpResponse> {
    return await this.editExpense.edit(expense)
  }
}
