export interface CheckUserById {
  CheckById: (id: string) => Promise<CheckUserById.Result>
}

export namespace CheckUserById {
  export type Result = boolean
}
