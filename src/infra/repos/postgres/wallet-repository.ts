import { PgConnection } from './helpers/connection'
import {
  AddWallet,
  CheckTotalPriceWalletById,
  CheckWalletByNameAndOwner,
  EditWallet,
  ListWalletById,
  ListWalletsByProfileId,
  RemoveWallet
} from '@/domain/contracts/repos'
import { PgProfile, PgWallet } from './entities'
import { RedisService } from '@/main/config/redis'
import { Profile } from '@/domain/entities'
import { HttpResponse } from '@/application/contracts'

export class PgWalletRepository
  implements
    AddWallet,
    CheckTotalPriceWalletById,
    ListWalletsByProfileId,
    ListWalletById,
    EditWallet,
    RemoveWallet,
    CheckWalletByNameAndOwner
{
  constructor(private readonly redisService: RedisService) {}
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

    const redisService = new RedisService()
    await redisService.del('wallets')

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

  async listAll(
    params: string | Profile
  ): Promise<ListWalletsByProfileId.Result> {
    const pgWalletRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgWallet)

    const idUser = params
    const cachedWallets = await this.redisService.get('wallets')

    if (!cachedWallets) {
      const wallets = await pgWalletRepo.find({
        relations: {
          expenses: true
        }
      })

      const walletsFindById = wallets.find(
        wallet => wallet.fk_profile === (idUser as Profile)
      )

      await this.redisService.set('wallets', JSON.stringify(wallets))
      return walletsFindById as unknown as PgWallet[]
    }

    const wallets = await pgWalletRepo.find({
      relations: {
        expenses: true
      },
      where: {
        fk_profile: {
          id_profile: idUser as string
        }
      }
    })

    return wallets
  }

  async ListById(id: number): Promise<ListWalletById.Result> {
    const pgWalletRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgWallet)

    const idWallet = id
    const cachedWallets = await this.redisService.get('wallets')

    if (!cachedWallets) {
      const wallets = await pgWalletRepo.find({
        relations: {
          expenses: true,
          fk_profile: true
        }
      })

      const walletFindById = wallets.find(
        wallet => wallet.id_wallet === idWallet
      )

      await this.redisService.set('wallets', JSON.stringify(wallets))
      return walletFindById as PgWallet
    }

    const wallets = (await pgWalletRepo.findOne({
      relations: {
        expenses: true,
        fk_profile: true
      },
      where: {
        id_wallet: idWallet
      }
    })) as PgWallet

    return wallets
  }

  async edit(
    wallet: EditWallet.Params
  ): Promise<EditWallet.Result | HttpResponse> {
    const pgWalletRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgWallet)

    const walletToEdit = (await pgWalletRepo.findOne({
      where: {
        id_wallet: wallet.id
      }
    })) as PgWallet

    walletToEdit.name_wallet = wallet.name
    walletToEdit.total_price_wallet = wallet.total_price
    walletToEdit.description_wallet = wallet.description
    walletToEdit.is_public = wallet.is_public

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      await manager.save(PgWallet, walletToEdit)
    })

    const redisService = new RedisService()
    await redisService.del('wallets')

    return {
      id: walletToEdit.id_wallet,
      statusCode: 201,
      message: 'Carteira editada com sucesso'
    }
  }

  async remove(id: number): Promise<RemoveWallet.Result> {
    const pgWalletRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgWallet)

    const walletToRemove = (await pgWalletRepo.findOne({
      where: {
        id_wallet: id
      }
    })) as PgWallet

    const entityManager = PgConnection.getInstance()
      .connect()
      .createEntityManager()

    await entityManager.transaction(async manager => {
      await manager.remove(PgWallet, walletToRemove)
    })

    const redisService = new RedisService()
    await redisService.del('wallets')

    return {
      id: walletToRemove.id_wallet,
      statusCode: 200,
      message: 'Carteira removida com sucesso'
    }
  }

  async checkByName(
    params: CheckWalletByNameAndOwner.Params
  ): Promise<CheckWalletByNameAndOwner.Result> {
    const pgWalletRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgWallet)

    const { name, owner } = params

    const wallet = await pgWalletRepo.findOne({
      where: {
        name_wallet: name,
        fk_profile: {
          id_profile: owner
        }
      }
    })

    if (wallet) {
      return true
    }

    return false
  }
}
