import { HttpResponse } from '@/application/contracts'

export interface EditWallet {
  edit: (wallet: EditWallet.Params) => Promise<EditWallet.Result | HttpResponse>
}

export namespace EditWallet {
  export type Params = {
    id: number
    name: string
    payment_day: number
    total_price: number
    is_public: boolean
    description: string
  }
  export type Result = {
    id: number
    statusCode: number
    message: string
  }
}
