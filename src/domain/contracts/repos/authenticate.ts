import { HttpResponse } from '@/application/contracts'

export interface Authenticate {
  auth: (
    params: Authenticate.Params
  ) => Promise<Authenticate.Result | boolean | HttpResponse>
}

export namespace Authenticate {
  export type Params = {
    email: string
    password: string
  }
  export type Result = {
    id: number
    email: string
    token: string
  }
}
