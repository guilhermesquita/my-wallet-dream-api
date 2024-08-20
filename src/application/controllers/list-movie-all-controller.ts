import { Controller, HttpResponse } from '../contracts'
import { ListMovieAll } from "../../domain/contracts/repos"
import {ok, serverError, unauthorized} from '../helpers'

export class ListMovieAllController implements Controller{
    constructor(
        private readonly listMovieAll: ListMovieAll 
    ){}

    async handle(request: ListMovieAllController.Request): Promise<HttpResponse>{
        try {

            const {authorization} = request
            const result = await this.listMovieAll.listAll(authorization) as HttpResponse

            if ('statusCode' in result && result.statusCode === 401) {
                return unauthorized();
            }

            return ok(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace ListMovieAllController {
    export type Request = {
        authorization: string
    }
}