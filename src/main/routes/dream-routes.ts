import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddDreamController,
  makeListDreamsByProfileIdController
} from '../factories/application/controllers'

export default (router: Router): void => {
  router.post('/dreams', adapt(makeAddDreamController()))
  router.get(
    '/dreams/profile/:id',
    adapt(makeListDreamsByProfileIdController())
  )
}
