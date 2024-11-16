import { HttpResponse } from '@/application/contracts'
import { Wallet } from '@/domain/entities'

export interface ListWalletsByProfileId {
  listAll: (idUser: string) => Promise<ListWalletsByProfileId.Result>
}

export namespace ListWalletsByProfileId {
  export type Result = Wallet[] | HttpResponse
}
