import { HttpResponse } from "@/application/contracts"
import { Movie } from "@/domain/entities"

export interface ListMovieById{
    ListById: (id: ListMovieById.Params) => Promise<ListMovieById.Result>
}

export namespace ListMovieById{
    export type Params = {
        id: string,
        token: string
    }
    export type Result =  Movie | boolean | HttpResponse
}