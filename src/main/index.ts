import './config/module-alias'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import 'reflect-metadata'
import { env } from '@/main/config/env'
import { API, SWAGGER } from '@/utils/constants'
import { Request, Response } from 'express'
import { runSeeds } from '@/infra/repos/postgres/seeds'

PgConnection.getInstance()
  .connect()
  .initialize()
  .then(async () => {
    const { app } = await import('@/main/config/app')
    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}${API}`)
      console.log(`Swagger at http://localhost:${env.port}${API}${SWAGGER}`)
    })

    app.get('/Ping', (req: Request, res: Response) => {
      res.send('Pong')
    })
  })
  .catch(console.error)
