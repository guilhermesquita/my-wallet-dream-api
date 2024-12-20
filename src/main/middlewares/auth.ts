import { AccessDeniedError } from '@/application/errors'
import { forbidden, unauthorized } from '@/application/helpers'
import { JwtTokenHandler } from '@/infra/gateways'
import { NextFunction, Request, Response } from 'express'
import {
  validationsTokenExpense,
  validationsTokenUser,
  validationsTokenWallet,
  validationTokenDream
} from '../adapters'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const jwtTokenHandler = new JwtTokenHandler()
  const token = req.headers.authorization
  const auth = token?.split(' ')[1] as string
  const url = req.originalUrl
  const method = req.method

  const routeValidations: Record<string, (args: any) => Promise<boolean>> = {
    '/api/users': validationsTokenUser,
    '/api/wallets': validationsTokenWallet,
    '/api/expenses': validationsTokenExpense,
    '/api/dreams': validationTokenDream
  }

  const matchingRoute = Object.keys(routeValidations).find(route =>
    url.startsWith(route)
  )

  if (!token) {
    return res.status(401).json(unauthorized())
  }

  try {
    const tokenPayload = await jwtTokenHandler.validate({ token: auth })
    let acessDeniedErro = false

    if (matchingRoute) {
      const isValid = await routeValidations[matchingRoute]({
        url,
        method,
        id: req.params.id,
        tokenPayload,
        profileId: req.body.owner,
        walletId: req.body.fk_wallet,
        email: req.params.email
      })

      if (!isValid) {
        acessDeniedErro = true
      }
    } else {
      return res
        .status(404)
        .json(`Nenhuma rota correspondente encontrada para:', ${url}`)
    }

    if (acessDeniedErro) {
      return res.status(403).json(forbidden(new AccessDeniedError()))
    }

    next()
  } catch (error) {
    return res.status(401).json(unauthorized())
  }
}
