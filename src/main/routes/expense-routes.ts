import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddExpenseController,
  makeEditExpenseController
} from '../factories/application/controllers'

export default (router: Router): void => {
  router.post('/expenses', adapt(makeAddExpenseController()))
  router.put('/expenses/:id', adapt(makeEditExpenseController()))
}
