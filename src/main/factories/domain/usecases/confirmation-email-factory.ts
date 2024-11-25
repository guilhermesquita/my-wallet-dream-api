import { ConfirmationEmail } from '@/domain/contracts/repos'
import { DbConfirmationEmail } from '@/domain/usecases'
import { PgUserRepository } from '@/infra/repos/postgres'
import { RedisService } from '@/main/config/redis'

export const makeDbConfirmationEmailFactory = (): ConfirmationEmail => {
  const userRepository = new PgUserRepository(new RedisService())
  return new DbConfirmationEmail(userRepository, userRepository)
}
