import { HttpResponse } from '@/application/contracts'

export interface FinishedDream {
  finished: (id: string) => Promise<FinishedDream.Result | HttpResponse>
}

export namespace FinishedDream {
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
