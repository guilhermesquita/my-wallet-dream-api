import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddWalletController,
  makeEditWalletController,
  makeListWalletByIdController,
  makeListWalletsByProfileIdController,
  makeRemoveWalletController
} from '../factories/application/controllers'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/wallets', auth, adapt(makeAddWalletController()))
  router.get('/wallets/:id', auth, adapt(makeListWalletByIdController())) // TRABALHAR LÓGICA DEPOIS
  router.delete('/wallets/:id', auth, adapt(makeRemoveWalletController()))
  router.get(
    '/wallets/profile/:id',
    auth,
    adapt(makeListWalletsByProfileIdController()) // TRABALHAR LÓGICA DEPOIS
  )
  router.put('/wallets/:id', auth, adapt(makeEditWalletController()))
}
