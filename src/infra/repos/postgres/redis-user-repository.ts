import { RedisService } from '@/main/config/redis'
import { PgUser } from './entities'
import { PgConnection } from './helpers'
import { ListUserById } from '@/domain/contracts/repos'
import { User } from '@/domain/entities'

export class RedisPgUserRepository implements ListUserById {
  constructor(private readonly redisService: RedisService) {}
  async ListById(user: ListUserById.Params): Promise<PgUser> {
    const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser)

    const idUser = user.id
    const cachedUsers = await this.redisService.get('users')

    if (!cachedUsers) {
      const users = await pgUserRepo.find()

      const userFindById = (await pgUserRepo.findOne({
        where: {
          id_user: user.id
        }
      })) as unknown as PgUser

      await this.redisService.set('users', JSON.stringify(users))
      return userFindById as User
    }

    const userJson = JSON.parse(cachedUsers) as any[]
    const userById = userJson.filter(
      user => user.id_user === idUser
    ) as unknown as PgUser

    return userById
  }
}
