import { HttpResponse } from '@/application/contracts'
import { User } from '@/domain/entities'

export interface ListUserById {
  ListById: (id: ListUserById.Params) => Promise<ListUserById.Result>
}

export namespace ListUserById {
  export type Params = {
    id: string
  }
  export type Result = User | boolean | HttpResponse
}
