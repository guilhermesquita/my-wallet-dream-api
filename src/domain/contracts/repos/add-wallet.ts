import { HttpResponse } from '@/application/contracts'
import { Profile } from '@/domain/entities'

export interface AddWallet {
  add: (wallet: AddWallet.Params) => Promise<AddWallet.Result | HttpResponse>
}

export namespace AddWallet {
  export type Params = {
    name: string
    total_price: string
    owner: string | Profile
    is_public: boolean
    description: string
    token: string
  }
  export type Result = {
    id: number
    statusCode: number
    message: string
  }
}
