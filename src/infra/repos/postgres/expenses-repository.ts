import { HttpResponse } from '@/application/contracts'
import {
  AddExpense,
  EditExpense,
  ListExpenseById,
  ListExpensesByWallet
} from '@/domain/contracts/repos'
import { PgExpense, PgWallet } from './entities'
import { UuidGenerator } from '@/infra/gateways'
import { PgConnection } from './helpers'
import { RedisService } from '@/main/config/redis'
import { Expense } from '@/domain/entities'

export class ExpensesRepository
  implements AddExpense, EditExpense, ListExpensesByWallet, ListExpenseById
{
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

  async edit(
    expense: EditExpense.Params
  ): Promise<EditExpense.Result | HttpResponse> {
    const pgExpenseRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgExpense)

    const expenseToEdit = (await pgExpenseRepo.findOne({
      where: {
        id_expense: expense.id
      }
    })) as PgExpense

    expenseToEdit.name_expense = expense.name
    expenseToEdit.value_expense = expense.value

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      await manager.save(PgExpense, expenseToEdit)
    })

    const redisService = new RedisService()
    await redisService.del('expenses')

    return {
      id: expenseToEdit.id_expense,
      statusCode: 201,
      message: 'Carteira editada com sucesso'
    }
  }

  async listByWallet(id_wallet: number): Promise<ListExpensesByWallet.Result> {
    const pgExpenseRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgExpense)

    const expenses = (await pgExpenseRepo.find({
      where: {
        fk_wallet: {
          id_wallet
        }
      }
    })) as Expense[]

    return expenses
  }

  async listById(id: string): Promise<ListExpenseById.Result> {
    const pgExpenseRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgExpense)

    const expense = (await pgExpenseRepo.findOne({
      where: {
        id_expense: id
      }
    })) as Expense

    return expense
  }
}
