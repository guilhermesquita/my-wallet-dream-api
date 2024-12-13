import { AddDream, ListDreamsByProfileId } from '@/domain/contracts/repos'
import { PgDream, PgProfile } from './entities'
import { UuidGenerator } from '@/infra/gateways'
import { PgConnection } from './helpers'
import { RedisService } from '@/main/config/redis'
import { Dream } from '@/domain/entities'

export class DreamRepository implements AddDream, ListDreamsByProfileId {
  async add(dream: AddDream.params): Promise<AddDream.result> {
    const pgDreamRepo = new PgDream()

    const uuid = new UuidGenerator()
    const id = uuid.generate()

    pgDreamRepo.id_dream = id
    pgDreamRepo.description_dream = dream.description
    pgDreamRepo.fk_profile = dream.fk_profile as PgProfile
    pgDreamRepo.value_dream = dream.value
    pgDreamRepo.name_dream = dream.name
    pgDreamRepo.time_expectation_dream = dream.time_expectation

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      await manager.save(PgDream, pgDreamRepo)
    })

    const redisService = new RedisService()
    await redisService.del('dreams')

    return {
      id: pgDreamRepo.id_dream,
      statusCode: 201,
      message: 'Dream criado com sucesso'
    }
  }

  async listAll(idUser: string): Promise<ListDreamsByProfileId.Result> {
    const pgDreamRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgDream)

    const dreams = (await pgDreamRepo.find({
      where: {
        fk_profile: {
          id_profile: idUser
        }
      }
    })) as Dream[]

    return dreams
  }
}
