import { ListMovieById } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { noContent, ok, serverError, unauthorized } from '../helpers'

export class ListMovieByIdController implements Controller {
    constructor(
        private readonly listMovieById: ListMovieById
    ) { }

    async handle(request: ListMovieByIdController.Request): Promise<HttpResponse> {
        try {
            const result = await this.listMovieById.ListById({ id: request.id, token: request.authorization }) as HttpResponse
            if ('statusCode' in result && result.statusCode === 204) {
                return noContent();
            }

            if ('statusCode' in result && result.statusCode === 401) {
                return unauthorized();
            }

            return ok(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace ListMovieByIdController {
    export type Request = {
        id: string,
        authorization: string
    }
}