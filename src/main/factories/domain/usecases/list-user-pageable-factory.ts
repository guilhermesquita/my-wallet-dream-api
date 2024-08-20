import { ListUserPageable } from '@/domain/contracts/repos'
import { PgUserRepository } from '@/infra/repos/postgres'
import { DbListUserPageable } from '@/domain/usecases'
import { JwtTokenHandler } from '@/infra/gateways'

export const makeDbListUserPageable = (): ListUserPageable => {
  const pgUserRepository = new PgUserRepository()
  return new DbListUserPageable(pgUserRepository, pgUserRepository, new JwtTokenHandler())
}