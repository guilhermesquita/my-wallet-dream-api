import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddDreamController,
  makeEditDreamController,
  makeFinishedDreamController,
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
  router.put('/dreams/:id', auth, adapt(makeEditDreamController()))
  router.patch('/dreams/:id', auth, adapt(makeFinishedDreamController()))
  router.delete('/dreams/:id', auth, adapt(makeRemoveDreamController()))
}
