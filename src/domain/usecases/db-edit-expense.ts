// import { notAcceptable } from '@/application/helpers'
import {
  CheckTotalPriceWalletById,
  EditExpense,
  ListExpenseById
} from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'
import { Expense } from '../entities'
import { notAcceptable } from '@/application/helpers'

export class DbEditExpense implements EditExpense {
  constructor(
    private readonly editExpense: EditExpense,
    private readonly loadExpenseById: ListExpenseById,
    private readonly checkTotalPriceWallet: CheckTotalPriceWalletById
  ) {}

  async edit(
    expense: EditExpense.Params
  ): Promise<EditExpense.Result | HttpResponse> {
    const expenseById = (await this.loadExpenseById.listById(
      expense.id
    )) as Expense

    if (!expenseById) {
      return notAcceptable('Gasto inexistente')
    }

    console.log(expenseById)

    const totalPrice = await this.checkTotalPriceWallet.check(
      Number(expenseById.fk_wallet.id_wallet)
    )

    if (totalPrice === false) {
      return notAcceptable('Carteira inexistente')
    }

    if (Number(totalPrice) < expense.value) {
      return notAcceptable('Valor do gasto ultrapassou o limite da carteira')
    }

    return await this.editExpense.edit(expense)
  }
}
