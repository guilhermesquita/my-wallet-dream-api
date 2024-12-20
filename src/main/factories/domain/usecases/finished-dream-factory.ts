import { FinishedDream } from '@/domain/contracts/repos'
import { DbFinishedDream } from '@/domain/usecases'
import { DreamRepository } from '@/infra/repos/postgres'

export const makeDbFinishedDream = (): FinishedDream => {
  const pgDreamRepository = new DreamRepository()
  return new DbFinishedDream(pgDreamRepository)
}
