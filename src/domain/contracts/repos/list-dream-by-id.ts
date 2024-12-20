import { HttpResponse } from '@/application/contracts'
import { Dream } from '@/domain/entities'

export interface ListDreamById {
  listById: (idUser: string) => Promise<ListDreamById.Result | HttpResponse>
}

export namespace ListDreamById {
  export type Result = Dream
}
