import { AddMovie } from "@/domain/contracts/repos";
import { badRequest, conflict, created, serverError, unauthorized } from "../helpers";
import { Controller, HttpResponse, Validation } from "../contracts";

export class AddMovieController implements Controller{
    constructor(
        private readonly addMovie: AddMovie,
        private readonly validation: Validation
    ){}
    async handle(request: AddMovieController.Request): Promise<HttpResponse>{
        try {

            
            const erro = this.validation.validate(request)
            if(erro){
                return badRequest(erro)
            }
            const {title, img, director, description, year, authorization} = request
            const result = await this.addMovie.add({title, img, director, description, year, token: authorization})

            if ('statusCode' in result && result.statusCode === 401) {
                return unauthorized();
            }

            return created(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace AddMovieController {
    export type Request = {
        title: string
        director: string
        year: string
        description: string
        img: string
        authorization: string
    }
}