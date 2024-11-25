import { HttpResponse } from '@/application/contracts'

export interface RemoveUser {
  remove: (user: RemoveUser.Params) => Promise<RemoveUser.Result | HttpResponse>
}

export namespace RemoveUser {
  export type Params = {
    id: string
    token: string
  }
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
