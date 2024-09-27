import { Controller } from '@/application/contracts'
import { AddWalletController } from '@/application/controllers'
import { makeDbAddWallet } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'
import { makeAddWalletValidation } from './add-wallet-validation-factory'

export const makeAddWalletController = (): Controller => {
  const controller = new AddWalletController(
    makeDbAddWallet(),
    makeAddWalletValidation()
  )
  return makePgTransactionController(controller)
}
