import { PgWallet } from '../entities'
import { PgConnection } from '../helpers/connection'

export const seedWallet = async (): Promise<void> => {
  const connection = PgConnection.getInstance().connect()

  if (!connection.isInitialized) {
    await connection.initialize()
  }

  const queryRunner = connection.createQueryRunner()

  try {
    await queryRunner.startTransaction()

    const pgWalletRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgWallet)

    const wallets = [
      {
        name_wallet: 'Walllet seed test',
        total_price_wallet: 800,
        fk_profile: 'd997d1c4-0108-46c7-a5db-5942e25295cb',
        is_public: true,
        description_wallet: 'Admin Wallet'
      },
      {
        name_wallet: 'Wallet Seed Test 2',
        total_price_wallet: 800,
        fk_profile: 'd997d1c4-0108-46c7-a5db-5942e25295cb',
        is_public: true,
        description_wallet: 'Admin Wallet'
      }
    ] as unknown as PgWallet[]

    const newWallet = pgWalletRepo.create(wallets)
    await pgWalletRepo.save(newWallet)
  } catch (error) {
    console.error('Error seeding users:', error)
    await queryRunner.rollbackTransaction()
  } finally {
    await queryRunner.release()
  }
}
