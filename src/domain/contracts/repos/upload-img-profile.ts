import { HttpResponse } from '@/application/contracts'

export interface UploadImageProfile {
  uploadImage: (
    params: UploadImageProfile.Params
  ) => Promise<UploadImageProfile.Return | HttpResponse | boolean>
}

export namespace UploadImageProfile {
  export type Params = {
    idUser: string
    token: string
    img_profile: Express.Multer.File
  }
  export type Return = {
    id: string
    statusCode: number
    message: string
  }
}
