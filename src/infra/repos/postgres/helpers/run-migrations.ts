import { PgConnection } from './connection'

export const runMigrations = async (): Promise<void> => {
  try {
    const connection = PgConnection.getInstance().connect()

    if (!connection.isInitialized) {
      await connection.initialize()
    }

    console.log('Running migrations...')
    await connection.runMigrations()
    console.log('Migrations executed successfully.')
  } catch (error) {
    console.error('Error running migrations:', error)
    throw error
  }
}
