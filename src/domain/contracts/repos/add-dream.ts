export interface AddDream {
  add: (dream: AddDream.params) => Promise<AddDream.result>
}

export namespace AddDream {
  export type params = {
    name_dream: string
    description_dream?: string
    time_expectation_dream: number
    value_dream: number
  }
  export type result = {
    id: string
    statusCode: number
    message: string
  }
}
