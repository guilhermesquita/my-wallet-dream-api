// // import { InvalidTokenError } from '@/application/errors'
// import { unauthorized } from '@/application/helpers'
// import { JwtTokenHandler } from '@/infra/gateways'
// import { NextFunction, Request, Response } from 'express'

// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const auth = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization
//   const auth = token?.split(' ')[1] as string
//   if (!token) {
//     return res.status(401).json(unauthorized())
//   }
//   res.

//   // res.status(401).json(forbidden(new AccessDeniedError()))

//   try {
//     const jwtTokenHandler = new JwtTokenHandler()
//     await jwtTokenHandler.validate({ token: auth })
//     next()
//   } catch (error) {
//     // res.status(403).json(forbidden(new InvalidTokenError()))
//   }
// }
