import { ConfirmationEmail } from '@/domain/contracts/repos'
import { DbConfirmationEmail } from '@/domain/usecases'
import { PgUserRepository } from '@/infra/repos/postgres'

export const makeDbConfirmationEmailFactory = (): ConfirmationEmail => {
  const userRepository = new PgUserRepository()
  return new DbConfirmationEmail(userRepository, userRepository)
}
