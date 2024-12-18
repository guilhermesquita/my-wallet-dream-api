import { Dream } from '@/domain/entities'

export interface ListDreamById {
  listById: (idUser: string) => Promise<ListDreamById.Result>
}

export namespace ListDreamById {
  export type Result = Dream
}
