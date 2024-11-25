import './config/module-alias'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import 'reflect-metadata'
import { env } from '@/main/config/env'
import { API, SWAGGER } from '@/utils/constants'
import { Request, Response } from 'express'
import { runMigrations } from '@/infra/repos/postgres/helpers/run-migrations'
// import { runSeeds } from '@/infra/repos/postgres/seeds'

const pgConnection = PgConnection.getInstance().connect()

pgConnection
  .initialize()
  .then(async () => {
    // Executar migrations após garantir que a conexão foi inicializada
    await runMigrations()
    // await runSeeds()

    const { app } = await import('@/main/config/app')
    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}${API}`)
      console.log(`Swagger at http://localhost:${env.port}${API}${SWAGGER}`)
    })

    app.get('/Ping', (_req: Request, res: Response) => {
      res.send('Pong')
    })
  })
  .catch(console.error)
