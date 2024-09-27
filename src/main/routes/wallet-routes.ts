import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddWalletController
  // makeListMovieAllController,
  // makeListMovieByIdController
} from '../factories/application/controllers'

export default (router: Router): void => {
  router.post('/wallets', adapt(makeAddWalletController()))
  // router.get('/movies', adapt(makeListMovieAllController()))
  // router.get('/movies/:id', adapt(makeListMovieByIdController()))
}
