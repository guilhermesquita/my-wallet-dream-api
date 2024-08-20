import { ListUserByEmail } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { noContent, ok, serverError, unauthorized } from '../helpers'

export class ListUserByEmailController implements Controller {
    constructor(
        private readonly listUserByEmail: ListUserByEmail
    ) { }

    async handle(request: ListUserByEmailController.Request): Promise<HttpResponse> {
        try {
            const result = await this.listUserByEmail.ListByEmail({ email: request.email }) as HttpResponse
            if ('statusCode' in result && result.statusCode === 204) {
                return noContent();
            }
            return ok(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace ListUserByEmailController {
    export type Request = {
        email: string
    }
}