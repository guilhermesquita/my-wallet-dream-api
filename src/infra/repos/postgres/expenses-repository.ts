import { HttpResponse } from '@/application/contracts'
import { AddExpense } from '@/domain/contracts/repos'
import { PgExpense, PgWallet } from './entities'
import { UuidGenerator } from '@/infra/gateways'
import { PgConnection } from './helpers'
import { RedisService } from '@/main/config/redis'

export class ExpensesRepository implements AddExpense {
  async add(
    expense: AddExpense.Params
  ): Promise<AddExpense.Result | HttpResponse> {
    const pgExpense = new PgExpense()

    const uuid = new UuidGenerator()
    const id = uuid.generate()

    pgExpense.id_expense = id
    pgExpense.name_expense = expense.name
    pgExpense.value_expense = expense.value
    pgExpense.fk_wallet = expense.fk_wallet as unknown as PgWallet

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      await manager.save(PgExpense, pgExpense)
    })

    const redisService = new RedisService()
    await redisService.del('expenses')

    return {
      id: pgExpense.id_expense,
      statusCode: 201,
      message: 'Gasto criado com sucesso'
    }
  }
}
