export interface CheckDreamById {
  CheckById: (id: string) => Promise<CheckDreamById.Result>
}

export namespace CheckDreamById {
  export type Result = boolean
}
