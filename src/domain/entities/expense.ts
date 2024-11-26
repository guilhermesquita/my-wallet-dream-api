import { Wallet } from './wallet'

export class Expense {
  id_expense: string
  name_expense: string
  value_expense: number
  fk_wallet: Wallet
}
