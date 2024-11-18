import { HttpResponse } from '@/application/contracts'

export interface EditUser {
  edit: (user: EditUser.Params) => Promise<EditUser.Result | HttpResponse>
}

export namespace EditUser {
  export type Params = {
    id: string
    username: string
    email: string
    password: string
  }
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
