import { AddDream } from '@/domain/contracts/repos'
import { Controller, HttpResponse, Validation } from '../contracts'
import { badRequest, ok, serverError } from '../helpers'

export class AddDreamController implements Controller {
  constructor(
    private readonly addDream: AddDream,
    private readonly validation: Validation
  ) {}

  async handle(request: AddDreamController.Request): Promise<HttpResponse> {
    try {
      const erro = this.validation.validate(request)
      if (erro) {
        return badRequest(erro)
      }
      const result = await this.addDream.add(request)
      return ok(result)
    } catch (error: any) {
      return serverError(error.message)
    }
  }
}

export namespace AddDreamController {
  export interface Request {
    name: string
    description: string
    fk_profile: string
    time_expectation: number
    value: number
  }
}
