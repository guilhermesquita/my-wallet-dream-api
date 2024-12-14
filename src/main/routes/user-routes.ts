import { Router } from 'express'
import {
  adaptExpressRoute as adapt,
  adaptMulterExpressRoute as adaptMulter
} from '../adapters'
import {
  makeAddUserController,
  makeAuthenticateController,
  makeConfirmationEmailController,
  makeEditUserController,
  makeListUserByIdController,
  makeResetUserPasswordController,
  makeUploadImgProfileController
} from '../factories/application/controllers'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/users', adapt(makeAddUserController()))
  router.post('/auth', adapt(makeAuthenticateController()))
  router.post(
    '/users/upload/:id',
    auth,
    adaptMulter(makeUploadImgProfileController())
  )
  router.get('/users/:id', auth, adapt(makeListUserByIdController()))
  router.get(
    '/users/email/confirmation/:id',
    auth,
    adapt(makeConfirmationEmailController())
  )
  router.put('/users/:id', auth, adapt(makeEditUserController()))
  router.patch(
    '/users/reset-password/:email',
    adapt(makeResetUserPasswordController())
  )
}
