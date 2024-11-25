import { ListUserById } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { noContent, ok, serverError, unauthorized } from '../helpers'

export class ListUserByIdController implements Controller {
  constructor(private readonly listUserById: ListUserById) {}

  async handle(request: ListUserByIdController.Request): Promise<HttpResponse> {
    try {
      const result = (await this.listUserById.ListById({
        id: request.id
      })) as HttpResponse
      if ('statusCode' in result && result.statusCode === 204) {
        return noContent()
      }

      if ('statusCode' in result && result.statusCode === 401) {
        return unauthorized()
      }

      return ok(result)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace ListUserByIdController {
  export type Request = {
    id: string
  }
}
