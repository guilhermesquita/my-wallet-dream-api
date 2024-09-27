import { AddWallet } from '@/domain/contracts/repos'
import { DbAddWallet } from '@/domain/usecases'
import { PgWalletRepository } from '@/infra/repos/postgres'

export const makeDbAddWallet = (): AddWallet => {
  const pgWalletRepository = new PgWalletRepository()
  return new DbAddWallet(pgWalletRepository)
}
