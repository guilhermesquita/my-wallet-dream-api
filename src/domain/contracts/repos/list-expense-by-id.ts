import { HttpResponse } from '@/application/contracts'
import { Expense } from '@/domain/entities'

export interface ListExpenseById {
  listById: (id: string) => Promise<ListExpenseById.Result>
}

export namespace ListExpenseById {
  export type Result = Expense | HttpResponse
}
