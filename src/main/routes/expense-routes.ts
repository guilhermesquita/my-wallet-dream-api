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
  router.post('/expenses', auth, adapt(makeAddExpenseController()))
  router.put('/expenses/:id', auth, adapt(makeEditExpenseController()))
  router.get('/expenses/:id', auth, adapt(makeListExpenseById()))
  router.delete('/expenses/:id', auth, adapt(makeRemoveExpenseController()))
  router.patch('/expenses/:id', auth, adapt(makePaymentExpenseController()))
  router.get(
    '/expenses/wallet/:id',
    auth,
    adapt(makeListExpensesByWalletController())
  )
}
