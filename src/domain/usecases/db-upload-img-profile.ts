import { HttpResponse } from '@/application/contracts'
import { UploadImageProfile } from '../contracts/repos'
import { forbidden, notAcceptable, unauthorized } from '@/application/helpers'
import { JwtTokenHandler } from '@/infra/gateways'

export class DbUploadImgProfile implements UploadImageProfile {
  constructor(
    private readonly uploadImageProfile: UploadImageProfile,
    private readonly jwtTokenHandler: JwtTokenHandler
  ) {}

  async uploadImage(
    params: UploadImageProfile.Params
  ): Promise<UploadImageProfile.Return | HttpResponse | boolean> {
    const result = await this.uploadImageProfile.uploadImage(params)
    if (!result) {
      return notAcceptable('Usuário não encontrado')
    }

    // tratamento do token
    if (!params.token) {
      return unauthorized()
    }

    const auth = params.token.split(' ')[1]
    const idValidate = await this.jwtTokenHandler.validate({ token: auth })

    if (idValidate !== params.idUser) {
      return forbidden({
        name: 'Usuário não autorizado!',
        message: 'Use o token corrreto!'
      })
    }

    // Se tudo der certo
    return result
  }
}
