import { HttpResponse } from "@/application/contracts"

export interface AddMovie{
    add: (movie: AddMovie.Params) => Promise<AddMovie.Result | HttpResponse> 
}

export namespace AddMovie{
    export type Params = {
        title: string
        director: string
        year: string
        img: string
        description: string
        token: string
    }
    export type Result = {
        id: string
        statusCode: number
        message: string
    }
}