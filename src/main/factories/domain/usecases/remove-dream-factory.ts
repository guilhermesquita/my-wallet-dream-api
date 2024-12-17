import { RemoveDream } from '@/domain/contracts/repos'
import { DbRemoveDream } from '@/domain/usecases'
import { DreamRepository } from '@/infra/repos/postgres'

export const makeDbRemoveDream = (): RemoveDream => {
  const pgDreamRepository = new DreamRepository()
  return new DbRemoveDream(pgDreamRepository)
}
