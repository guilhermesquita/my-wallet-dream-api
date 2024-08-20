import { HttpResponse } from "@/application/contracts"
import { User } from "@/domain/entities"

export interface ListUserPageable {
  listPageable: (
    params: ListUserPageable.Params
  ) => Promise<ListUserPageable.Result | HttpResponse>
}

export namespace ListUserPageable {
  export type Params = {
    pageable: Pageable
    filter: Filter
    token: string
  }

  export type Pageable = {
    pageNumber: number
    size: number
    orderBy: string
    order: string
  }

  export type Filter = {
    name?: string
    email?: string
    created_at_start?: Date
    created_at_end?: Date
  }

  export type Result = {
    items: User[]
    totalPages: number
    totalItems: number
    orderBy: string
    order: string
  }
}