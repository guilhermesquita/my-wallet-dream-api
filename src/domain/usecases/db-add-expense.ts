import { HttpResponse } from '@/application/contracts'
import { AddExpense } from '../contracts/repos'

export class DbAddExpense implements AddExpense {
  constructor(private readonly addExpense: AddExpense) {}

  async add(
    expense: AddExpense.Params
  ): Promise<AddExpense.Result | HttpResponse> {
    return await this.addExpense.add(expense)
  }
}
