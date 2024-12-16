import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddExpenseController,
  makeEditExpenseController,
  makeListExpenseById,
  makeListExpensesByWalletController,
  makePaymentExpenseController,
  makeRemoveExpenseController
} from '../factories/application/controllers'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/expenses', adapt(makeAddExpenseController()))
  router.put('/expenses/:id', adapt(makeEditExpenseController()))
  router.get('/expenses/:id', auth, adapt(makeListExpenseById()))
  router.delete('/expenses/:id', adapt(makeRemoveExpenseController()))
  router.patch('/expenses/:id', adapt(makePaymentExpenseController()))
  router.get(
    '/expenses/wallet/:walletId',
    auth,
    adapt(makeListExpensesByWalletController())
  )
}
