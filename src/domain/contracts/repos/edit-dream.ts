import { HttpResponse } from '@/application/contracts'

export interface EditDream {
  edit: (params: EditDream.Params) => Promise<EditDream.Result | HttpResponse>
}

export namespace EditDream {
  export type Params = {
    id: string
    name: string
    description: string
    time_expection: number
    value: number
  }

  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
