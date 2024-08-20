import { DbTransactionController } from '@/application/decorators'
import { makePgConnection } from '@/main/factories/infra/repos/postgres/helpers/connection'
import { Controller } from '@/application/contracts'

export const makePgTransactionController = (
  controller: Controller
): DbTransactionController => {
  return new DbTransactionController(controller, makePgConnection())
}
