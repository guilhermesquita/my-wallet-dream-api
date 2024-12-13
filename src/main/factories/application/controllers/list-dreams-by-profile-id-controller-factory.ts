import { Controller } from '@/application/contracts'
import { makePgTransactionController } from '../decorators'
import { ListDreamsByProfileIdController } from '@/application/controllers'
import { makeDbListDreamsByProfileId } from '../../domain/usecases'

export const makeListDreamsByProfileIdController = (): Controller => {
  const controller = new ListDreamsByProfileIdController(
    makeDbListDreamsByProfileId()
  )
  return makePgTransactionController(controller)
}
