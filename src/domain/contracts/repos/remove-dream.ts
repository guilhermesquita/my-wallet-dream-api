import { HttpResponse } from '@/application/contracts'

export interface RemoveDream {
  remove: (id: string) => Promise<RemoveDream.Result | HttpResponse>
}

export namespace RemoveDream {
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
