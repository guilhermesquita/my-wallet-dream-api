import { AddDream } from '@/domain/contracts/repos'
import { DbAddDream } from '@/domain/usecases'
import { DreamRepository } from '@/infra/repos/postgres'

export const makeDbAddDream = (): AddDream => {
  const dreamRepository = new DreamRepository()
  //   const walletRepository = new PgWalletRepository(new RedisService())
  return new DbAddDream(dreamRepository)
}
