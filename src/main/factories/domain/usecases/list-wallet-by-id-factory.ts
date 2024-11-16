import { ListWalletById } from '@/domain/contracts/repos'
import { DbListWalletById } from '@/domain/usecases'
import { PgWalletRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbListWalletById = (): ListWalletById => {
  const pgWalletRepository = new PgWalletRepository(new RedisService())
  return new DbListWalletById(pgWalletRepository)
}
