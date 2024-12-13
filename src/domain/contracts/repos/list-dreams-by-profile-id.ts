import { HttpResponse } from '@/application/contracts'
import { Dream } from '@/domain/entities'

export interface ListDreamsByProfileId {
  listAll: (idUser: string) => Promise<ListDreamsByProfileId.Result>
}

export namespace ListDreamsByProfileId {
  export type Result = Dream[] | HttpResponse
}
