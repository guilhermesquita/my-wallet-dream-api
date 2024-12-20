import { PgConnection } from './helpers/connection'
import fs from 'fs'
import {
  AddUser,
  Authenticate,
  CheckUserByEmail,
  CheckConfirmaitonEmail,
  ConfirmationEmail,
  UploadImageProfile,
  ListUserById,
  EditUser,
  CheckUserById,
  ResetUserPassword,
  ListUserByEmail
} from '@/domain/contracts/repos'
import { PgProfile, PgUser } from './entities'
import { JwtTokenHandler, UuidGenerator } from '@/infra/gateways'
import { HashManager } from '@/infra/gateways/hash-manager'
import { RedisService } from '@/main/config/redis'
import {
  deleteObjectCommand,
  putObjectCommand,
  r2
} from '@/main/config/cloudflare-s3'
import { sendEmail } from '@/main/config/nodemailer'
import { HttpResponse } from '@/application/contracts'

export class PgUserRepository
  implements
    AddUser,
    CheckUserByEmail,
    ConfirmationEmail,
    CheckConfirmaitonEmail,
    Authenticate,
    UploadImageProfile,
    ListUserById,
    EditUser,
    CheckUserById,
    ResetUserPassword,
    ListUserByEmail
{
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

  async edit(user: EditUser.Params): Promise<EditUser.Result | HttpResponse> {
    const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser)
    const pgProfileRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgProfile)

    const userToEdit = (await pgUserRepo.findOne({
      where: {
        id_user: user.id
      }
    })) as PgUser

    userToEdit.email_user = user.email || userToEdit.email_user

    let hashManager: HashManager | undefined
    user.password && (hashManager = new HashManager())
    const hashedPassword = await hashManager?.hash(user.password)

    userToEdit.encripyted_password_user =
      hashedPassword ?? userToEdit.encripyted_password_user

    const profileToEdit = (await pgProfileRepo.findOne({
      where: {
        id_profile: user.id
      }
    })) as PgProfile

    profileToEdit.username_profile =
      user.username ?? profileToEdit.username_profile

    if (user.email) {
      userToEdit.email_confirmed = false
      await sendEmail({
        subject: 'Confirme seu email!',
        html: `<p>Olá ${profileToEdit.username_profile}, clique no link para confimar seu email: <a href="#" target="_blank">linkdaconfirmacao.com</a></p>`,
        to: user.email
      })
    }

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      await manager.save(PgProfile, profileToEdit)
      await manager.save(PgUser, userToEdit)
    })

    const redisService = new RedisService()
    await redisService.del('users')

    return {
      id: userToEdit.id_user,
      statusCode: 201,
      message: 'Usuário editado com sucesso'
    }
  }

  async CheckById(id: string): Promise<CheckUserById.Result> {
    const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser)

    const user = await pgUserRepo.findOne({
      where: {
        id_user: id
      }
    })

    let result: boolean = false
    user && (result = true)
    return result
  }

  async ListById(user: ListUserById.Params): Promise<PgUser> {
    const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser)

    const idUser = user.id
    const cachedUsers = await this.redisService.get('users')

    if (cachedUsers === null) {
      const users = await pgUserRepo.find({
        relations: {
          fk_identify_profile: true
        }
      })

      const userFindById = users.find(
        user => user.id_user === 'ee5c27b4-8211-4a8b-ad65-1af144948a86'
      )

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

        try {
          const command = deleteObjectCommand(deleteParams)
          await r2.send(command)
        } catch (error) {
          console.error('Error deleting object:', error)
        }
      }
    }

    const params1 = {
      Bucket: 'my-wallet-dream',
      Key: params.img_profile.filename,
      Body: fileContent,
      ContentType: params.img_profile.mimetype
    }

    try {
      const command = putObjectCommand(params1)
      await r2.send(command)
      uploadImageProfile.img_profile = `${process.env.PUBLIC_IMAGE}/${params1.Key}`

      await fs.promises.unlink(params.img_profile.path)
    } catch (error) {
      console.error('Error uploading object:', error)
    }

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

  async reset(
    user: ResetUserPassword.Params
  ): Promise<ResetUserPassword.Result | HttpResponse> {
    const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser)

    const userReset = (await pgUserRepo.findOne({
      where: {
        email_user: user.email
      }
    })) as PgUser

    const hashManager = new HashManager()
    const newPassword = await hashManager.hash(user.password)

    userReset.encripyted_password_user = newPassword

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      const saved = await manager.save(PgUser, userReset)
      await manager.save(saved)
    })

    return {
      statusCode: 200,
      message: 'Senha resetada com sucesso'
    }
  }

  async ListByEmail(
    email: ListUserByEmail.Params
  ): Promise<ListUserByEmail.Result> {
    const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser)

    const user = (await pgUserRepo.findOne({
      where: {
        email_user: email.email
      }
    })) as PgUser

    return user
  }
}
