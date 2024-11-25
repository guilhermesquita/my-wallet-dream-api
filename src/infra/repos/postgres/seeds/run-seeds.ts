import './config-module/module-alias'
import { seedTest } from './seeds'

export const runSeeds = async (): Promise<void> => {
  console.log('Running seeds...')
  try {
    await seedTest()
    console.log('All seeds executed successfully.')
  } catch (error) {
    console.error('Error running seeds:', error)
  }
}

void runSeeds()
