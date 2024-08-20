import swaggerConfig from '@/main/docs'
import { noCache } from '@/main/middlewares'

import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import { API, SWAGGER } from '@/utils/constants'

export default (app: Express): void => {
  app.use(`${API}${SWAGGER}`, noCache, serve, setup(swaggerConfig))
}
