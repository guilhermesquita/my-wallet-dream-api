import { Controller } from '@/application/contracts'
import { ListUserPageableController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/application/decorators'
import { makeDbListUserPageable } from '@/main/factories/domain/usecases'
import { makeListUserPageableValidation } from '@/main/factories/application/controllers'

export const makeListUserPageableController = (): Controller => {
  const controller = new ListUserPageableController(
    makeDbListUserPageable(),
    makeListUserPageableValidation()
  )
  return makePgTransactionController(controller)
}