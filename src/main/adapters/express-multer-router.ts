import { Controller } from '@/application/contracts'
import { Request, RequestHandler, Response } from 'express'
import { upload } from '../config/multer'

export const adaptMulterExpressRoute = (
  controller: Controller
): [RequestHandler, RequestHandler] => {
  return [
    upload.single('file'),
    async (req: Request, res: Response): Promise<void> => {
      const request = {
        ...(req.body || {}),
        ...(req.params || {}),
        ...(req.headers || {}),
        ...(req.query || {}),
        file: req.file
      }
      const httpResponse = await controller.handle(request)
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json(httpResponse)
      }
    }
  ]
}
