import { seedTest } from './seeds'

export const runSeeds = async (): Promise<void> => {
  console.log('Running seeds...')
  try {
    await seedTest()
    // Chame outras seeds aqui
    // await seedCategories();
    console.log('All seeds executed successfully.')
  } catch (error) {
    console.error('Error running seeds:', error)
  }
}
