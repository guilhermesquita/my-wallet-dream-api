import { HttpResponse } from "@/application/contracts"
import { Movie } from "@/domain/entities"

export interface ListMovieAll {
    listAll: (token: string) => Promise <ListMovieAll.Result>
}

export namespace ListMovieAll{
    export type Result = Movie[] | undefined | HttpResponse
}