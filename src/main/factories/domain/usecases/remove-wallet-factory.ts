import { RemoveWallet } from '@/domain/contracts/repos'
import { DbRemoveWallet } from '@/domain/usecases'
import { PgWalletRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbRemoveWallet = (): RemoveWallet => {
  const pgWalletRepo = new PgWalletRepository(new RedisService())
  return new DbRemoveWallet(pgWalletRepo)
}
