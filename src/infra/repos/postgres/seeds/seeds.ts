import { PgConnection } from '../helpers/connection'

export const seedTest = async (): Promise<void> => {
  const connection = PgConnection.getInstance().connect()

  if (!connection.isInitialized) {
    await connection.initialize()
  }

  const queryRunner = connection.createQueryRunner()

  try {
    await queryRunner.startTransaction()

    const teste = await queryRunner.manager.find('public.teste')
    console.log(teste)

    //  await queryRunner.manager.insert('public.teste', [
    //    { id: 1, name: 'Admin', email: 'admin@example.com' },
    //    { id: 2, name: 'User', email: 'user@example.com' }
    //  ])

    await queryRunner.commitTransaction()
  } catch (error) {
    console.error('Error seeding users:', error)
    await queryRunner.rollbackTransaction()
  } finally {
    await queryRunner.release()
  }
}
