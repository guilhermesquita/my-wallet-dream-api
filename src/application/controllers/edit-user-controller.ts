import { EditUser } from "@/domain/contracts/repos";
import { badRequest, created, notAcceptable, serverError, unauthorized } from "../helpers";
import { Controller, HttpResponse, Validation } from "../contracts";

export class EditUserController implements Controller{
    constructor(
        private readonly editUser: EditUser,
        private readonly validation: Validation
    ){}
    async handle(request: EditUserController.Request): Promise<HttpResponse>{
        try {
            const erro = this.validation.validate(request)
            if(erro){
                return badRequest(erro)
            }
            const {id, name, email, password, authorization} = request
            const result = await this.editUser.edit({id, name, email, password, token: authorization})
            
            if('statusCode' in result && result.statusCode === 406) {
                return notAcceptable(result.message);
            }

            if('statusCode' in result && result.statusCode === 401) {
                return unauthorized();
            }

            return created(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace EditUserController {
    export type Request = {
        id: number
        name: string
        email: string
        password: string
        authorization: string
    }
}