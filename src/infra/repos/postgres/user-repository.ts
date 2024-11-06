import { PgConnection } from './helpers/connection'
import fs from 'fs'
import {
  AddUser,
  Authenticate,
  CheckUserByEmail,
  CheckConfirmaitonEmail,
  ConfirmationEmail,
  UploadImageProfile,
  ListUserById
} from '@/domain/contracts/repos'
import { PgProfile, PgUser } from './entities'
import { JwtTokenHandler, UuidGenerator } from '@/infra/gateways'
import { HashManager } from '@/infra/gateways/hash-manager'
import { RedisService } from '@/main/config/redis'
import { r2 } from '@/main/config/cloudflare-s3'
import { sendEmail } from '@/main/config/nodemailer'

export class PgUserRepository
  implements
    AddUser,
    CheckUserByEmail,
    ConfirmationEmail,
    CheckConfirmaitonEmail,
    Authenticate,
    UploadImageProfile,
    ListUserById
{
  // ListUserById,
  // EditUser,
  // RemoveUser,
  // ListUserPageable,
  // ListUserByEmail,
  // ResetUserPassword
  constructor(private readonly redisService: RedisService) {}
  async add(user: AddUser.Params): Promise<AddUser.Result> {
    const pgUserRepo = new PgUser()
    const pgProfileRepo = new PgProfile()

    const uuid = new UuidGenerator()
    const id = uuid.generate()

    pgProfileRepo.id_profile = id
    pgProfileRepo.username_profile = user.name_profile
    pgProfileRepo.img_profile = user.img_profile

    pgUserRepo.id_user = id
    pgUserRepo.email_user = user.email_user
    pgUserRepo.email_confirmed = user.emailConfirmed

    const hashManager = new HashManager()
    const hashedPassword = await hashManager.hash(user.encrypted_password)
    pgUserRepo.encripyted_password_user = hashedPassword

    pgUserRepo.fk_identify_profile = pgProfileRepo

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      await manager.save(PgProfile, pgProfileRepo)
      await manager.save(PgUser, pgUserRepo)
    })

    await sendEmail({
      subject: 'Confirme seu email!',
      html: `<p>Olá ${pgProfileRepo.username_profile}, clique no link para confimar seu email: <a href="#" target="_blank">linkdaconfirmacao.com</a></p>`,
      to: pgUserRepo.email_user
    })

    const redisService = new RedisService()
    await redisService.del('users')

    return {
      id: pgUserRepo.id_user,
      statusCode: 201,
      message: 'Usuário cadastrado com sucesso'
    }
  }

  async ListById(user: ListUserById.Params): Promise<PgUser> {
    const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser)

    const idUser = user.id
    const cachedUsers = await this.redisService.get('users')

    if (!cachedUsers) {
      const users = await pgUserRepo.find({
        relations: {
          fk_identify_profile: {
            wallets: true
          }
        },
        where: {
          fk_identify_profile: {
            wallets: {
              is_public: true
            }
          }
        }
      })

      const userFindById = users.find(user => user.id_user === idUser)

      await this.redisService.set('users', JSON.stringify(users))
      return userFindById as PgUser
    }

    const userJson = JSON.parse(cachedUsers) as PgUser[]
    const userById = userJson.find(user => user.id_user === idUser)

    const redisService = new RedisService()
    await redisService.del('users')

    return userById as PgUser
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

  async confirme(
    params: ConfirmationEmail.Params
  ): Promise<ConfirmationEmail.Result> {
    const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser)

    const userConfirmedEmail = (await pgUserRepo.findOne({
      where: {
        id_user: params.id
      }
    })) as unknown as PgUser

    userConfirmedEmail.email_confirmed = true

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      const saved = await manager.save(PgUser, userConfirmedEmail)
      await manager.save(saved)
    })

    const token = new JwtTokenHandler()

    const jwtToken = await token.generate({
      expirationInMs: 8 * 60 * 60 * 1000,
      key: userConfirmedEmail.id_user
    })

    return {
      id: userConfirmedEmail.id_user,
      statusCode: 200,
      message: 'Email confirmado com sucesso',
      token: jwtToken
    }
  }

  async checkConfirmation(id: string): Promise<boolean> {
    const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser)

    let exists: boolean

    const userPg = (await pgUserRepo.findOne({
      where: {
        id_user: id,
        email_confirmed: true
      }
    })) as unknown as PgUser

    !userPg ? (exists = false) : (exists = true)

    return exists
  }

  async uploadImage(
    params: UploadImageProfile.Params
  ): Promise<UploadImageProfile.Return | boolean> {
    const fileContent = fs.readFileSync(params.img_profile.path)

    const pgProfileRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgProfile)

    const uploadImageProfile = (await pgProfileRepo.findOne({
      where: {
        id_profile: params.idUser
      }
    })) as unknown as PgProfile

    if (!uploadImageProfile) {
      return false
    }

    if (uploadImageProfile.img_profile) {
      const currentImageKey = uploadImageProfile.img_profile
        .split('/my-wallet-dream/')
        .pop()

      if (currentImageKey) {
        const deleteParams = {
          Bucket: 'my-wallet-dream',
          Key: currentImageKey
        }

        await r2.deleteObject(deleteParams).promise()
      }
    }

    const params1 = {
      Bucket: 'my-wallet-dream',
      Key: params.img_profile.filename,
      Body: fileContent,
      ContentType: params.img_profile.mimetype
    }

    const data = await r2.upload(params1).promise()
    fs.unlinkSync(params.img_profile.path)

    uploadImageProfile.img_profile = `https://pub-d575c6b3e1654ffe98fbc926a91ae6a6.r2.dev/my-wallet-dream/${data.Key}`

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      const saved = await manager.save(PgProfile, uploadImageProfile)
      await manager.save(saved)
    })

    const redisService = new RedisService()
    await redisService.del('users')

    return {
      id: params.idUser,
      statusCode: 200,
      message: 'Imagem enviada com sucesso'
    }
  }

  async auth(
    params: Authenticate.Params
  ): Promise<Authenticate.Result | boolean> {
    try {
      const pgUserRepo = PgConnection.getInstance()
        .connect()
        .getRepository(PgUser)

      const user = (await pgUserRepo.findOne({
        where: {
          email_user: params.email
        }
      })) as PgUser

      if (!user) {
        return false
      }

      const hashManager = new HashManager()
      const isCorrectPassword = await hashManager.compare(
        params.password,
        user.encripyted_password_user
      )

      if (!isCorrectPassword) {
        return false
      }

      const tokenHandler = new JwtTokenHandler()
      const jwtToken = await tokenHandler.generate({
        expirationInMs: 8 * 60 * 60 * 1000, // 8 horas
        key: user.id_user
      })

      return {
        id: user.id_user,
        email: user.email_user,
        token: jwtToken
      }
    } catch (error) {
      console.error('Erro ao autenticar o usuário:', error)
      return false // Retorna falso em caso de erro
    }
  }

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
