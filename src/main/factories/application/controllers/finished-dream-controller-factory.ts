import { Controller } from '@/application/contracts'
import { FinishedDreamController } from '@/application/controllers'
import { makeDbFinishedDream } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'

export const makeFinishedDreamController = (): Controller => {
  const controller = new FinishedDreamController(makeDbFinishedDream())
  return makePgTransactionController(controller)
}
