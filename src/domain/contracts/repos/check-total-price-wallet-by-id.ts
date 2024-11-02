export interface CheckTotalPriceWalletById {
  check: (id: number) => Promise<number | boolean>
}
