import { HttpResponse } from '@/application/contracts'
import { Expense } from '@/domain/entities'

export interface ListExpensesByWallet {
  listByWallet: (id_wallet: number) => Promise<ListExpensesByWallet.Result>
}

export namespace ListExpensesByWallet {
  export type Result = Expense[] | HttpResponse
}
