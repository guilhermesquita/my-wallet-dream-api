import { HttpResponse } from '@/application/contracts'
import { UploadImageProfile } from '../contracts/repos'

export class DbUploadImgProfile implements UploadImageProfile {
  constructor(private readonly uploadImageProfile: UploadImageProfile) {}
  async uploadImage(
    params: UploadImageProfile.Params
  ): Promise<UploadImageProfile.Return | HttpResponse> {
    return await this.uploadImageProfile.uploadImage(params)
  }
}
