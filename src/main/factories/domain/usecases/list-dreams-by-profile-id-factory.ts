import { ListDreamsByProfileId } from '@/domain/contracts/repos'
import { DbListDreamsAllByProfileId } from '@/domain/usecases'
import { PgUserRepository, DreamRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbListDreamsByProfileId = (): ListDreamsByProfileId => {
  const pgDreamRepository = new DreamRepository()
  const pgUserRepository = new PgUserRepository(new RedisService())
  return new DbListDreamsAllByProfileId(pgDreamRepository, pgUserRepository)
}
