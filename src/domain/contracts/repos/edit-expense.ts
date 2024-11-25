import { HttpResponse } from '@/application/contracts'

export interface EditExpense {
  edit: (
    expense: EditExpense.Params
  ) => Promise<EditExpense.Result | HttpResponse>
}

export namespace EditExpense {
  export type Params = {
    id: string
    name: string
    value: number
  }
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
