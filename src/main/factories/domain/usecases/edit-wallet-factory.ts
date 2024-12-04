import { EditWallet } from '@/domain/contracts/repos'
import { DbEditWallet } from '@/domain/usecases'
import { PgWalletRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbEditWallet = (): EditWallet => {
  const pgWalletRepository = new PgWalletRepository(new RedisService())
  return new DbEditWallet(
    pgWalletRepository,
    pgWalletRepository,
    pgWalletRepository
  )
}
