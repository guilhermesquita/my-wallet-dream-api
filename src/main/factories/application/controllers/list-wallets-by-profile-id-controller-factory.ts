import { Controller } from '@/application/contracts'
import { makePgTransactionController } from '../decorators'
import { ListWalletsByProfileIdController } from '@/application/controllers'
import { makeDbListWalletsByProfileId } from '../../domain/usecases'

export const makeListWalletsByProfileIdController = (): Controller => {
  const controller = new ListWalletsByProfileIdController(
    makeDbListWalletsByProfileId()
  )
  return makePgTransactionController(controller)
}
