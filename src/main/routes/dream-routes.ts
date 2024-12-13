import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import { makeAddDreamController } from '../factories/application/controllers'

export default (router: Router): void => {
  router.post('/dreams', adapt(makeAddDreamController()))
}
