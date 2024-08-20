import { AddUser } from "@/domain/contracts/repos";
import { badRequest, conflict, created, serverError } from "../helpers";
import { Controller, HttpResponse, Validation } from "../contracts";

export class AddUserController implements Controller{
    constructor(
        private readonly addUser: AddUser,
        private readonly validation: Validation
    ){}
    async handle(request: AddUserController.Request): Promise<HttpResponse>{
        try {
            const erro = this.validation.validate(request)
            if(erro){
                return badRequest(erro)
            }
            const {name, email, password} = request
            const result = await this.addUser.add({name, email, password})

            if('statusCode' in result && result.statusCode === 409) {
                return conflict();
            }

            return created(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace AddUserController {
    export type Request = {
        name: string
        email: string
        password: string
    }
}