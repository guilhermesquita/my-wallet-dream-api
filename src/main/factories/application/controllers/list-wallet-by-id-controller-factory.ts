import { Controller } from '@/application/contracts'
import { makeDbListWalletById } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'
import { ListWalletByIdController } from '@/application/controllers/list-wallet-by-id-controller'

export const makeListWalletByIdController = (): Controller => {
  const controller = new ListWalletByIdController(makeDbListWalletById())
  return makePgTransactionController(controller)
}
