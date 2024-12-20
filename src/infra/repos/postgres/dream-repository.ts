import {
  AddDream,
  CheckDreamById,
  EditDream,
  FinishedDream,
  ListDreamById,
  ListDreamsByProfileId,
  RemoveDream
} from '@/domain/contracts/repos'
import { PgDream, PgProfile } from './entities'
import { UuidGenerator } from '@/infra/gateways'
import { PgConnection } from './helpers'
import { RedisService } from '@/main/config/redis'
import { Dream } from '@/domain/entities'
import { HttpResponse } from '@/application/contracts'

export class DreamRepository
  implements
    AddDream,
    ListDreamsByProfileId,
    EditDream,
    RemoveDream,
    ListDreamById,
    FinishedDream,
    CheckDreamById
{
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

  async edit(params: EditDream.Params): Promise<EditDream.Result> {
    const pgDreamRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgDream)

    const dreamToUpdate = (await pgDreamRepo.findOne({
      where: {
        id_dream: params.id
      }
    })) as PgDream

    dreamToUpdate.description_dream =
      params.description || dreamToUpdate.description_dream
    dreamToUpdate.name_dream = params.name || dreamToUpdate.name_dream
    dreamToUpdate.time_expectation_dream =
      params.time_expection || dreamToUpdate.time_expectation_dream
    dreamToUpdate.value_dream = params.value || dreamToUpdate.value_dream

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      await manager.save(PgDream, dreamToUpdate)
    })

    const redisService = new RedisService()
    await redisService.del('dreams')

    return {
      id: dreamToUpdate.id_dream,
      statusCode: 201,
      message: 'Dream editado com sucesso'
    }
  }

  async remove(id: string): Promise<RemoveDream.Result> {
    const pgDreamRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgDream)

    const dreamToRemove = (await pgDreamRepo.findOne({
      where: {
        id_dream: id
      }
    })) as PgDream

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      await manager.remove(PgDream, dreamToRemove)
    })

    const redisService = new RedisService()
    await redisService.del('dreams')

    return {
      id: dreamToRemove.id_dream,
      statusCode: 201,
      message: 'Dream removido com sucesso'
    }
  }

  async listById(idUser: string): Promise<ListDreamById.Result> {
    const pgDreamRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgDream)

    const dream = (await pgDreamRepo.findOne({
      where: {
        id_dream: idUser
      },
      relations: {
        fk_profile: true
      }
    })) as Dream

    return dream
  }

  async finished(id: string): Promise<FinishedDream.Result | HttpResponse> {
    const pgDreamRepository = PgConnection.getInstance()
      .connect()
      .getRepository(PgDream)

    const dream = (await pgDreamRepository.findOne({
      where: {
        id_dream: id
      }
    })) as PgDream

    dream.is_finished_dream = true

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      await manager.save(PgDream, dream)
    })

    const redisService = new RedisService()
    await redisService.del('expenses')

    return {
      id: dream.id_dream,
      statusCode: 200,
      message: 'Dream finalizado com sucesso!'
    }
  }

  async CheckById(id: string): Promise<CheckDreamById.Result> {
    const pgDreamRepository = PgConnection.getInstance()
      .connect()
      .getRepository(PgDream)

    const dream = await pgDreamRepository.findOne({
      where: {
        id_dream: id
      }
    })

    let result: boolean = false
    dream && (result = true)

    return result
  }
}
