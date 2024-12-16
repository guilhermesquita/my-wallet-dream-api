import { notAcceptable } from '@/application/helpers'
import { ListExpenseById, PaymentExpense } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbPaymentExpense implements PaymentExpense {
  constructor(
    private readonly paymentExpense: PaymentExpense,
    private readonly listExpensesById: ListExpenseById
  ) {}

  async payment(id: string): Promise<PaymentExpense.Result | HttpResponse> {
    const expense = await this.listExpensesById.listById(id)
    if (!expense) {
      return notAcceptable('Gasto não encontrado')
    }
    return await this.paymentExpense.payment(id)
  }
}
