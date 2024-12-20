import { User } from '@/domain/entities'

export interface ListUserByEmail {
  ListByEmail: (
    email: ListUserByEmail.Params
  ) => Promise<ListUserByEmail.Result>
}

export namespace ListUserByEmail {
  export type Params = {
    email: string
  }
  export type Result = User
}
