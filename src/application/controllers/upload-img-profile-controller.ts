import { UploadImageProfile } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import {
  created,
  forbidden,
  notAcceptable,
  serverError,
  unauthorized
} from '../helpers'

export class UploadImageProfileController implements Controller {
  constructor(private readonly uploadImageProfile: UploadImageProfile) {}
  async handle(
    request: UploadImageProfileController.Request
  ): Promise<HttpResponse> {
    try {
      const { id, file, authorization } = request
      const result = (await this.uploadImageProfile.uploadImage({
        idUser: id,
        img_profile: file,
        token: authorization
      })) as HttpResponse

      if ('statusCode' in result && result.statusCode === 406) {
        return notAcceptable('Usuário não encontrado!')
      }

      if ('statusCode' in result && result.statusCode === 401) {
        return unauthorized()
      }

      if ('statusCode' in result && result.statusCode === 403) {
        return forbidden({
          name: 'Usuário não autorizado!',
          message: 'Use o token corrreto!'
        })
      }

      return created(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace UploadImageProfileController {
  export type Request = {
    id: string
    authorization: string
    file: Express.Multer.File
  }
}
