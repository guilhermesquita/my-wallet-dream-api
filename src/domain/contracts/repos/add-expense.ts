import { HttpResponse } from '@/application/contracts'
import { Wallet } from '@/domain/entities/wallet'

export interface AddExpense {
  add: (expense: AddExpense.Params) => Promise<AddExpense.Result | HttpResponse>
}

export namespace AddExpense {
  export type Params = {
    name: string
    value: number
    fk_wallet: number | Wallet
  }
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
