import { Controller } from '@/application/contracts'
import { RemoveDreamController } from '@/application/controllers'
import { makeDbRemoveDream } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'

export const makeRemoveDreamController = (): Controller => {
  const controller = new RemoveDreamController(makeDbRemoveDream())
  return makePgTransactionController(controller)
}
