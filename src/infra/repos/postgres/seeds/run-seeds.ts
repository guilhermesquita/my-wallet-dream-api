import './config-module/module-alias'
import { seedWallet } from './seeds'

export const runSeeds = async (): Promise<void> => {
  console.log('Running seeds...')
  try {
    await seedWallet()
    console.log('All seeds executed successfully.')
  } catch (error) {
    console.error('Error running seeds:', error)
  }
}

void runSeeds()
