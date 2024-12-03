export interface CheckWalletByNameAndOwner {
  checkByName: (
    params: CheckWalletByNameAndOwner.Params
  ) => Promise<CheckWalletByNameAndOwner.Result>
}

export namespace CheckWalletByNameAndOwner {
  export type Params = {
    name: string
    owner: string
  }
  export type Result = boolean
}
