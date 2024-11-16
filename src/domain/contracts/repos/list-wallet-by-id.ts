import { HttpResponse } from '@/application/contracts'
import { Wallet } from '@/domain/entities'

export interface ListWalletById {
  ListById: (id: number) => Promise<ListWalletById.Result>
}

export namespace ListWalletById {
  export type Result = Wallet | HttpResponse
}
