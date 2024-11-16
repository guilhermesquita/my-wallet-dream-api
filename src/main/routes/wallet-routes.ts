import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddWalletController,
  makeListWalletByIdController
  // makeListMovieAllController,
  // makeListMovieByIdController
} from '../factories/application/controllers'
import { makeListWalletsByProfileIdController } from '../factories/application/controllers/list-wallets-by-profile-id-controller-factory'

export default (router: Router): void => {
  router.post('/wallets', adapt(makeAddWalletController()))
  router.get('/wallets/:id', adapt(makeListWalletByIdController()))
  router.get(
    '/wallets/profile/:id',
    adapt(makeListWalletsByProfileIdController())
  )
  // router.get('/movies/:id', adapt(makeListMovieByIdController()))
}
