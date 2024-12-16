import { HttpResponse } from '@/application/contracts'

export interface PaymentExpense {
  payment: (id: string) => Promise<PaymentExpense.Result | HttpResponse>
}

export namespace PaymentExpense {
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
