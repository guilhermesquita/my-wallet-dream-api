export interface RemoveExpense {
  remove: (id: string) => Promise<RemoveExpense.Result>
}

export namespace RemoveExpense {
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
