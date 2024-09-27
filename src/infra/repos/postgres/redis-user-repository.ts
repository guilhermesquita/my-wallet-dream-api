import { RedisService } from '@/main/config/redis'
import { PgUser } from './entities'
import { PgConnection } from './helpers'
import { ListUserById } from '@/domain/contracts/repos'

export class RedisPgUserRepository implements ListUserById {
  constructor(private readonly redisService: RedisService) {}
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
}
