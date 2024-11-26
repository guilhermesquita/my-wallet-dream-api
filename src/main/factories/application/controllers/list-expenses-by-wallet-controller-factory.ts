import { Controller } from '@/application/contracts'
import { makeDbListExpensesByWallet } from '../../domain/usecases'
import { makePgTransactionController } from '../decorators'
import { ListExpensesByWalletController } from '@/application/controllers'

export const makeListExpensesByWalletController = (): Controller => {
  const controller = new ListExpensesByWalletController(
    makeDbListExpensesByWallet()
  )
  return makePgTransactionController(controller)
}
