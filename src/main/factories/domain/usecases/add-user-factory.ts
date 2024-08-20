import { AddUser } from '@/domain/contracts/repos'
import { DbAddUser } from '@/domain/usecases'
import { PgUserRepository } from '@/infra/repos/postgres'

export const makeDbAddUser = (): AddUser => {
  const pgUserRepository = new PgUserRepository()
  return new DbAddUser(pgUserRepository, pgUserRepository)
}
