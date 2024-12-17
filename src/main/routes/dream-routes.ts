import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddDreamController,
  makeEditDreamController,
  makeListDreamsByProfileIdController,
  makeRemoveDreamController
} from '../factories/application/controllers'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/dreams', adapt(makeAddDreamController()))
  router.get(
    '/dreams/profile/:id',
    auth,
    adapt(makeListDreamsByProfileIdController())
  )
  router.put('/dreams/:id', adapt(makeEditDreamController()))
  router.delete('/dreams/:id', adapt(makeRemoveDreamController()))
}
