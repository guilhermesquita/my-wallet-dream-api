import { ListWalletsByProfileId } from '@/domain/contracts/repos'
import { DbListWalletAllByProfileId } from '@/domain/usecases'
import { PgWalletRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbListWalletsByProfileId = (): ListWalletsByProfileId => {
  const pgWalletRepository = new PgWalletRepository(new RedisService())
  return new DbListWalletAllByProfileId(pgWalletRepository)
}
