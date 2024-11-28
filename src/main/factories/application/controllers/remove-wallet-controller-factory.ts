import { Controller } from '@/application/contracts'
import { RemoveWalletController } from '@/application/controllers'
import { makeDbRemoveWallet } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'

export const makeRemoveWalletController = (): Controller => {
  const controller = new RemoveWalletController(makeDbRemoveWallet())
  return makePgTransactionController(controller)
}
