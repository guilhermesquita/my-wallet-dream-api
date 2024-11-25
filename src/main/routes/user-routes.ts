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
  makeUploadImgProfileController
} from '../factories/application/controllers'

export default (router: Router): void => {
  router.post('/users', adapt(makeAddUserController()))
  router.post('/auth', adapt(makeAuthenticateController()))
  router.post(
    '/users/upload/:id',
    adaptMulter(makeUploadImgProfileController())
  )
  router.get('/users/:id', adapt(makeListUserByIdController()))
  router.get(
    '/users/email/confirmation/:id',
    adapt(makeConfirmationEmailController())
  )
  router.put('/users/:id', adapt(makeEditUserController()))
  // router.put(
  //   '/users/reset-password/:email',
  //   adapt(makeResetUserPasswordController())
  // )
}
