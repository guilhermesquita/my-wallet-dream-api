import { AddDream } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers'

export class AddDreamController implements Controller {
  constructor(private readonly addDream: AddDream) {}

  async handle(request: AddDreamController.Request): Promise<HttpResponse> {
    try {
      const result = await this.addDream.add(request)
      return ok(result)
    } catch (error: any) {
      return serverError(error.message)
    }
  }
}

export namespace AddDreamController {
  export interface Request {
    name_dream: string
    description_dream?: string
    time_expectation_dream: number
    value_dream: number
  }
}
