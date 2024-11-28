import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddExpenseController,
  makeEditExpenseController,
  makeListExpenseById,
  makeListExpensesByWalletController
} from '../factories/application/controllers'

export default (router: Router): void => {
  router.post('/expenses', adapt(makeAddExpenseController()))
  router.put('/expenses/:id', adapt(makeEditExpenseController()))
  router.get('/expenses/:id', adapt(makeListExpenseById()))
  router.get(
    '/expenses/wallet/:walletId',
    adapt(makeListExpensesByWalletController())
  )
}
