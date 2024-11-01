import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import { makeAddExpenseController } from '../factories/application/controllers'

export default (router: Router): void => {
  router.post('/expenses', adapt(makeAddExpenseController()))
}
