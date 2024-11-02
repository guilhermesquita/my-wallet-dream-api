import { PgConnection } from './helpers/connection'
import { AddWallet, CheckTotalPriceWalletById } from '@/domain/contracts/repos'
import { PgProfile, PgWallet } from './entities'

export class PgWalletRepository
  implements AddWallet, CheckTotalPriceWalletById
{
  async add(wallet: AddWallet.Params): Promise<AddWallet.Result> {
    const pgWalletRepo = new PgWallet()

    pgWalletRepo.description_wallet = wallet.description
    pgWalletRepo.is_public = wallet.is_public
    pgWalletRepo.name_wallet = wallet.name
    pgWalletRepo.total_price_wallet = wallet.total_price
    pgWalletRepo.fk_profile = wallet.owner as PgProfile

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()
    await entityManager.transaction(async manager => {
      const saved = await manager.save(PgWallet, pgWalletRepo)
      await manager.save(saved)
    })

    return {
      id: pgWalletRepo.id_wallet,
      statusCode: 201,
      message: 'Carteira criada com sucesso'
    }
  }

  async check(id: number): Promise<number | boolean> {
    const pgWalletRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgWallet)

    const wallet = (await pgWalletRepo.findOne({
      where: {
        id_wallet: id
      },
      relations: {
        expenses: true
      }
    })) as PgWallet

    if (!wallet) {
      return false
    }

    const totalPriceWallet = wallet.total_price_wallet as unknown as number
    const expenses = wallet.expenses
    let totalValueExpenses: number = 0

    for (const expense of expenses) {
      totalValueExpenses += expense.value_expense
    }

    const totalValue = totalPriceWallet - totalValueExpenses

    return Number(totalValue)
  }
}
