import { HttpResponse } from '@/application/contracts'

export interface RemoveExpense {
  remove: (id: string) => Promise<RemoveExpense.Result | HttpResponse>
}

export namespace RemoveExpense {
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
