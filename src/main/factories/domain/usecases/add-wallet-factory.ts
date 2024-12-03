import { AddWallet } from '@/domain/contracts/repos'
import { DbAddWallet } from '@/domain/usecases'
import { PgUserRepository, PgWalletRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbAddWallet = (): AddWallet => {
  const pgWalletRepository = new PgWalletRepository(new RedisService())
  const pgUserRepository = new PgUserRepository(new RedisService())
  return new DbAddWallet(
    pgWalletRepository,
    pgWalletRepository,
    pgUserRepository
  )
}
