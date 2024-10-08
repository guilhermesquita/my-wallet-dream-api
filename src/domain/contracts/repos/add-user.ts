import { HttpResponse } from '@/application/contracts'

export interface AddUser {
  add: (user: AddUser.Params) => Promise<AddUser.Result | HttpResponse>
}

export namespace AddUser {
  export type Params = {
    name_profile: string
    email_user: string
    emailConfirmed: boolean
    encrypted_password: string
    img_profile: string
  }
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
