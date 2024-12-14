import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddWalletController,
  makeEditWalletController,
  makeListWalletByIdController,
  makeListWalletsByProfileIdController,
  makeRemoveWalletController
} from '../factories/application/controllers'

export default (router: Router): void => {
  router.post('/wallets', adapt(makeAddWalletController()))
  router.get('/wallets/:id', adapt(makeListWalletByIdController()))
  router.delete('/wallets/:id', adapt(makeRemoveWalletController()))
  router.get(
    '/wallets/profile/:id',
    adapt(makeListWalletsByProfileIdController())
  )
  router.put('/wallets/:id', adapt(makeEditWalletController()))
}
