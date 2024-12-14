import { AccessDeniedError } from '@/application/errors'
import { forbidden, unauthorized } from '@/application/helpers'
import { JwtTokenHandler } from '@/infra/gateways'
import { NextFunction, Request, Response } from 'express'
import { validationsTokenUser } from '../adapters'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const jwtTokenHandler = new JwtTokenHandler()
  const token = req.headers.authorization
  const auth = token?.split(' ')[1] as string
  const url = req.originalUrl
  const method = req.method

  if (!token) {
    return res.status(401).json(unauthorized())
  }

  try {
    const tokenPayload = await jwtTokenHandler.validate({ token: auth })

    const validationTokenUser = await validationsTokenUser({
      url,
      method,
      id: req.params.id,
      tokenPayload
    })

    if (!validationTokenUser) {
      return res.status(403).json(forbidden(new AccessDeniedError()))
    }

    next()
  } catch (error) {
    return res.status(401).json(unauthorized())
  }
}
