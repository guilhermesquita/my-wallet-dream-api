import { UploadImageProfile } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { created, serverError } from '../helpers'

export class UploadImageProfileController implements Controller {
  constructor(private readonly uploadImageProfile: UploadImageProfile) {}
  async handle(
    request: UploadImageProfileController.Request
  ): Promise<HttpResponse> {
    try {
      const { id, file } = request
      const result = await this.uploadImageProfile.uploadImage({
        idUser: id,
        img_profile: file
      })
      return created(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace UploadImageProfileController {
  export type Request = {
    id: string
    file: Express.Multer.File
  }
}
