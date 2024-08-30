/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
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

    const cachedUsers = await this.redisService.get('users')

    if (!cachedUsers) {
      const userFindById = (await pgUserRepo.findOne({
        where: {
          id_user: user.id
        }
      })) as unknown as PgUser

      await this.redisService.set('users', JSON.stringify(userFindById))
      return userFindById as User
    }

    return JSON.parse(cachedUsers as string)
  }
}
