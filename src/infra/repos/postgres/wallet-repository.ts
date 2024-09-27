import { PgConnection } from './helpers/connection'
import { AddWallet } from '@/domain/contracts/repos'
import { PgProfile, PgWallet } from './entities'

export class PgWalletRepository implements AddWallet {
  //   async listAll(): Promise<ListMovieAll.Result> {
  //     const pgMovieRepo = PgConnection.getInstance()
  //       .connect()
  //       .getRepository(PgMovie)
  //     const moviesPg = await pgMovieRepo.find()
  //     return moviesPg
  //   }
  //   async ListById(movie: ListMovieById.Params): Promise<ListMovieById.Result> {
  //     const pgMovieRepo = PgConnection.getInstance()
  //       .connect()
  //       .getRepository(PgMovie)
  //     let idExists: boolean | PgMovie = false
  //     const idFind = await pgMovieRepo.findOne({
  //       where: {
  //         id_movie: movie.id
  //       }
  //     })
  //     idFind ? (idExists = idFind) : (idExists = false)
  //     return idExists as Movie
  //   }

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
}
