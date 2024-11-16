import { AddWallet } from '@/domain/contracts/repos'
import { DbAddWallet } from '@/domain/usecases'
import { PgWalletRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbAddWallet = (): AddWallet => {
  const pgWalletRepository = new PgWalletRepository(new RedisService())
  return new DbAddWallet(pgWalletRepository)
}
