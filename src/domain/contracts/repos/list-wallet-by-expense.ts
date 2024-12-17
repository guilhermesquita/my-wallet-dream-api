import { Wallet } from '@/domain/entities'

export interface ListWalletByExpense {
  listByExpense: (id: string) => Promise<ListWalletByExpense.Result>
}

export namespace ListWalletByExpense {
  export type Result = Wallet
}
