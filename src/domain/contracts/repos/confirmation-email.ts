import { HttpResponse } from '@/application/contracts'

export interface ConfirmationEmail {
  confirme: (
    params: ConfirmationEmail.Params
  ) => Promise<ConfirmationEmail.Result | HttpResponse>
}

export namespace ConfirmationEmail {
  export type Params = {
    id: string
  }
  export type Result = {
    id: string
    statusCode: number
    message: string
    token: string
  }
}
