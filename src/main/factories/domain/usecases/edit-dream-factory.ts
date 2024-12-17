import { EditDream } from '@/domain/contracts/repos'
import { DbEditDream } from '@/domain/usecases'
import { DreamRepository } from '@/infra/repos/postgres'

export const makeDbEditDream = (): EditDream => {
  const pgDreamRepository = new DreamRepository()
  return new DbEditDream(pgDreamRepository)
}
