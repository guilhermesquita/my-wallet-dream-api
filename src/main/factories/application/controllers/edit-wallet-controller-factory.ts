import { Controller } from '@/application/contracts'
import { EditWalletController } from '@/application/controllers'
import { makeDbEditWallet } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'
import { makeEditWalletValidation } from './edit-wallet-validation-factory'

export const makeEditWalletController = (): Controller => {
  const controller = new EditWalletController(
    makeDbEditWallet(),
    makeEditWalletValidation()
  )
  return makePgTransactionController(controller)
}
