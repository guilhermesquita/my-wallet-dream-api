import { HttpResponse } from '@/application/contracts'

export interface ResetUserPassword {
  reset: (
    user: ResetUserPassword.Params
  ) => Promise<ResetUserPassword.Result | HttpResponse>
}

export namespace ResetUserPassword {
  export type Params = {
    password: string
    email: string
  }
  export type Result = {
    id: number
    statusCode: number
    message: string
  }
}
