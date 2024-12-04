import { HttpResponse } from '@/application/contracts'

export interface RemoveWallet {
  remove: (id: number) => Promise<RemoveWallet.Result | HttpResponse>
}

export namespace RemoveWallet {
  export type Result = {
    id: number
    statusCode: number
    message: string
  }
}
