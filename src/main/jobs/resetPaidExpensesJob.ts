import { PgExpense, PgWallet } from '@/infra/repos/postgres/entities'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import cron from 'node-cron'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const resetPaidExpensesJob = () => {
  cron.schedule('0 0 * * *', async () => {
    const pgWalletRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgWallet)

    const today = new Date()
    const dayOfMonth = today.getDate()

    try {
      const wallets = await pgWalletRepo.find({
        relations: {
          expenses: true
        }
      })
      wallets.forEach(async wallet => {
        wallet.expenses.forEach(async expense => {
          if (dayOfMonth === wallet.payment_day_wallet) {
            expense.paid_expense = false
            const entityManager = PgConnection.getInstance()
              .connect()
              .createEntityManager()
            await entityManager.transaction(async manager => {
              const saved = await manager.save(PgExpense, expense)
              await manager.save(saved)
            })
          }
        })
      })
    } catch (error) {
      console.error(error)
    }
  })
}
