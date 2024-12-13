import { notAcceptable } from '@/application/helpers'
import { AddDream, CheckUserById } from '../contracts/repos'
import { HttpResponse } from '@/application/contracts'

export class DbAddDream implements AddDream {
  constructor(
    private readonly addDream: AddDream,
    private readonly checkUserExists: CheckUserById
  ) {}

  async add(dream: AddDream.params): Promise<AddDream.result | HttpResponse> {
    const checkUser = await this.checkUserExists.CheckById(
      dream.fk_profile as string
    )
    if (!checkUser) {
      return notAcceptable('Usuário não encontrado')
    }
    return await this.addDream.add(dream)
  }
}
