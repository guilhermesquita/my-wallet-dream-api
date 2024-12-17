export interface RemoveDream {
  remove: (id: string) => Promise<RemoveDream.Result>
}

export namespace RemoveDream {
  export type Result = {
    id: string
    statusCode: number
    message: string
  }
}
