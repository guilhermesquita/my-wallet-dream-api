import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddDreamController,
  makeListDreamsByProfileIdController
} from '../factories/application/controllers'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/dreams', adapt(makeAddDreamController()))
  router.get(
    '/dreams/profile/:id',
    auth,
    adapt(makeListDreamsByProfileIdController())
  )
}
