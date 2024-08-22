import { Router } from 'express'
import { adaptExpressRoute as adapt } from '../adapters'
import {
  makeAddUserController,
  makeAuthenticateController,
  makeConfirmationEmailController,
  makeEditUserController,
  makeListUserByEmailController,
  makeListUserByIdController,
  makeListUserPageableController,
  makeRemoveUserController
} from '../factories/application/controllers'
import { makeResetUserPasswordController } from '../factories/application/controllers/reset-user-password-controller-factory'

export default (router: Router): void => {
  router.post('/users', adapt(makeAddUserController()))
  router.post('/auth', adapt(makeAuthenticateController()))
  router.get('/users/:id', adapt(makeListUserByIdController()))
  router.get(
    '/users/email/confirmation/:id',
    adapt(makeConfirmationEmailController())
  )
  router.put('/users/:id', adapt(makeEditUserController()))
  router.delete('/users/:id', adapt(makeRemoveUserController()))
  router.get('/users', adapt(makeListUserPageableController()))
  router.get('/users/mail/:email', adapt(makeListUserByEmailController()))
  router.put(
    '/users/reset-password/:email',
    adapt(makeResetUserPasswordController())
  )
}
