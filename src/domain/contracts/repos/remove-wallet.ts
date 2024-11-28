export interface RemoveWallet {
  remove: (id: number) => Promise<RemoveWallet.Result>
}

export namespace RemoveWallet {
  export type Result = {
    id: number
    statusCode: number
    message: string
  }
}
