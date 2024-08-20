/* eslint-disable @typescript-eslint/no-unused-vars */
import { PgConnection } from './helpers/connection'
import {
  AddUser,
  Authenticate,
  CheckUserByEmail,
  EditUser,
  ListUserByEmail,
  ListUserById,
  ListUserPageable,
  RemoveUser,
  ResetUserPassword
} from '@/domain/contracts/repos'
import { PgUser } from './entities'
import { JwtTokenHandler, UuidGenerator } from '@/infra/gateways'
import { User } from '@/domain/entities'
import { HttpResponse } from '@/application/contracts'
import { HashManager } from '@/infra/gateways/hash-manager'

export class PgUserRepository implements AddUser, CheckUserByEmail {
  // Authenticate,
  // ListUserById,
  // EditUser,
  // RemoveUser,
  // ListUserPageable,
  // ListUserByEmail,
  // ResetUserPassword
  async add(user: AddUser.Params): Promise<AddUser.Result> {
    const pgUserRepo = new PgUser()

    const uuuid = new UuidGenerator()
    const id = uuuid.generate()

    pgUserRepo.id_user = id
    pgUserRepo.email_user = user.email_user
    pgUserRepo.email_confirmed = user.emailConfirmed

    const hashManager = new HashManager()
    const hashedPasword = await hashManager.hash(user.encrypted_password)

    pgUserRepo.encripyted_password_user = hashedPasword

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      const saved = await manager.save(PgUser, pgUserRepo)
      await manager.save(saved)
    })

    const token = new JwtTokenHandler()

    const jwtToken = await token.generate({
      expirationInMs: 8 * 60 * 60 * 1000,
      key: pgUserRepo.id_user
    })

    return {
      id: pgUserRepo.id_user,
      statusCode: 201,
      token: jwtToken,
      message: 'Usuário cadastrado com sucesso'
    }
  }

  async check(email: string): Promise<boolean> {
    const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser)

    let exists: boolean

    const userPg = (await pgUserRepo.findOne({
      where: {
        email_user: email
      }
    })) as unknown as PgUser

    !userPg ? (exists = false) : (exists = true)

    return exists
  }
  //   async ListById(user: ListUserById.Params): Promise<ListUserById.Result> {
  //     const pgUserRepo = PgConnection.getInstance()
  //       .connect()
  //       .getRepository(PgUser)

  //     let idExists: boolean | PgUser = false

  //     const idFind = (await pgUserRepo.findOne({
  //       where: {
  //         id_user: user.id
  //       }
  //     })) as unknown as PgUser

  //     idFind ? (idExists = idFind) : (idExists = false)

  //     return idExists as User
  //   }

  //   async auth(
  //     params: Authenticate.Params
  //   ): Promise<Authenticate.Result | boolean> {
  //     const pgUserRepo = PgConnection.getInstance()
  //       .connect()
  //       .getRepository(PgUser)

  //     const userPg = (await pgUserRepo.findOne({
  //       where: {
  //         email_user: params.email,
  //         password_user: params.password
  //       }
  //     })) as unknown as PgUser

  //     if (!userPg) {
  //       return false
  //     }

  //     const token = new JwtTokenHandler()

  //     const jwtToken = await token.generate({
  //       expirationInMs: 8 * 60 * 60 * 1000,
  //       key: userPg.id_user as string
  //     })

  //     return {
  //       id: userPg.id_user as number,
  //       email: userPg.email_user,
  //       token: jwtToken
  //     }
  //   }

  //   async edit(user: EditUser.Params): Promise<EditUser.Result> {
  //     const pgUserRepo = PgConnection.getInstance()
  //       .connect()
  //       .getRepository(PgUser)

  //     const userToEdit = (await pgUserRepo.findOne({
  //       where: {
  //         id_user: user.id
  //       }
  //     })) as unknown as PgUser

  //     userToEdit.nm_user = user.name || userToEdit.nm_user
  //     userToEdit.email_user = user.email || userToEdit.email_user
  //     userToEdit.password_user = user.password || userToEdit.password_user

  //     const entityManager = PgConnection.getInstance()
  //       .connect()
  //       .createEntityManager()

  //     await entityManager.transaction(async manager => {
  //       const saved = await manager.save(PgUser, userToEdit)
  //       await manager.save(saved)
  //     })

  //     return {
  //       id: userToEdit.id_user as number,
  //       statusCode: 201,
  //       message: 'Usuário editado com sucesso'
  //     }
  //   }

  //   async remove(user: RemoveUser.Params): Promise<RemoveUser.Result> {
  //     const pgUserRepo = PgConnection.getInstance()
  //       .connect()
  //       .getRepository(PgUser)

  //     const userToDelete = (await pgUserRepo.findOne({
  //       where: {
  //         id_user: user.id
  //       }
  //     })) as unknown as PgUser

  //     const entityManager = PgConnection.getInstance()
  //       .connect()
  //       .createEntityManager()

  //     await entityManager.transaction(async manager => {
  //       await manager.remove(PgUser, userToDelete)
  //     })

  //     return {
  //       id: user.id,
  //       statusCode: 200,
  //       message: 'Usuário deletado com sucesso'
  //     }
  //   }

  //   async check(email: string): Promise<boolean> {
  //     const pgUserRepo = PgConnection.getInstance()
  //       .connect()
  //       .getRepository(PgUser)

  //     let exists: boolean

  //     const userPg = (await pgUserRepo.findOne({
  //       where: {
  //         email_user: email
  //       }
  //     })) as unknown as PgUser

  //     !userPg ? (exists = false) : (exists = true)

  //     return exists
  //   }

  //   async listPageable(
  //     data: ListUserPageable.Params
  //   ): Promise<ListUserPageable.Result> {
  //     const { pageable, filter } = data
  //     const pgUserRepo = PgConnection.getInstance()
  //       .connect()
  //       .getRepository(PgUser)

  //     const queryFilters = {
  //       name: `tbl_user.nm_user ilike '%' || :name || '%'`,
  //       email: `tbl_user.email_user ilike '%' || :email || '%'`,
  //       created_at_start: 'tbl_user.created_at >= :created_at_start',
  //       created_at_end: 'tbl_user.created_at <= :created_at_end'
  //     }

  //     const query = pgUserRepo.createQueryBuilder('tbl_user')

  //     if (Object.keys(filter).length > 0) {
  //       for (const a of Object.keys(filter)) {
  //         if (queryFilters[a] !== undefined) {
  //           query.andWhere(queryFilters[a], filter)
  //         }
  //       }
  //     }

  //     const totalItems = await query.getCount()
  //     const totalPages = Math.ceil(totalItems / pageable.size)

  //     const results = await query
  //       .orderBy(
  //         `tbl_user.${pageable.orderBy}`,
  //         pageable.order === 'ASC' ? 'ASC' : 'DESC'
  //       )
  //       .skip((pageable.pageNumber - 1) * pageable.size)
  //       .take(pageable.size)
  //       .getMany()

  //     return {
  //       items: results as User[],
  //       totalPages,
  //       totalItems,
  //       orderBy: pageable.orderBy,
  //       order: pageable.order
  //     }
  //   }

  //   async ListByEmail(
  //     user: ListUserByEmail.Params
  //   ): Promise<ListUserByEmail.Result> {
  //     const pgUserRepo = PgConnection.getInstance()
  //       .connect()
  //       .getRepository(PgUser)

  //     let idExists: boolean | PgUser = false

  //     const idFind = (await pgUserRepo.findOne({
  //       where: {
  //         email_user: user.email
  //       }
  //     })) as unknown as PgUser

  //     idFind ? (idExists = idFind) : (idExists = false)

  //     return idExists as User
  //   }

  //   async reset(
  //     user: ResetUserPassword.Params
  //   ): Promise<HttpResponse | ResetUserPassword.Result> {
  //     const pgUserRepo = PgConnection.getInstance()
  //       .connect()
  //       .getRepository(PgUser)

  //     const userToEdit = (await pgUserRepo.findOne({
  //       where: {
  //         email_user: user.email
  //       }
  //     })) as unknown as PgUser

  //     userToEdit.password_user = user.password || userToEdit.password_user

  //     const entityManager = PgConnection.getInstance()
  //       .connect()
  //       .createEntityManager()

  //     await entityManager.transaction(async manager => {
  //       const saved = await manager.save(PgUser, userToEdit)
  //       await manager.save(saved)
  //     })

  //     return {
  //       id: userToEdit.id_user as number,
  //       statusCode: 201,
  //       message: 'Senha redefinida com sucesso!'
  //     }
  //   }
}
