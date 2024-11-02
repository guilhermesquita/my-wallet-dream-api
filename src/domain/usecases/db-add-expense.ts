import { HttpResponse } from '@/application/contracts'
import { AddExpense, CheckTotalPriceWalletById } from '../contracts/repos'
import { notAcceptable } from '@/application/helpers'

export class DbAddExpense implements AddExpense {
  constructor(
    private readonly addExpense: AddExpense,
    private readonly checkTotalPriceWallet: CheckTotalPriceWalletById
  ) {}

  async add(
    expense: AddExpense.Params
  ): Promise<AddExpense.Result | HttpResponse> {
    const totalPrice = await this.checkTotalPriceWallet.check(
      expense.fk_wallet as number
    )

    if (totalPrice === false) {
      return notAcceptable('Carteira inexistente')
    }

    if (Number(totalPrice) < expense.value) {
      return notAcceptable('Valor do gasto ultrapassou o limite da carteira')
    }

    return await this.addExpense.add(expense)
  }
}
