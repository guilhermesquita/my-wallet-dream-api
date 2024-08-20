import { HttpResponse } from '@/application/contracts'

export interface AddUser {
  add: (user: AddUser.Params) => Promise<AddUser.Result | HttpResponse>
}

export namespace AddUser {
  export type Params = {
    email_user: string
    emailConfirmed: boolean
    encrypted_password: string
  }
  export type Result = {
    id: string
    statusCode: number
    message: string
    token: string
  }
}
