import { HttpResponse } from "@/application/contracts"

export interface EditUser{
    edit: (user: EditUser.Params) => Promise<EditUser.Result | HttpResponse> 
}

export namespace EditUser{
    export type Params = {
        id: number
        name: string
        email: string
        password: string
        token: string
    }
    export type Result = {
        id: number
        statusCode: number
        message: string
    }
}