import { Authenticate } from "@/domain/contracts/repos";
import { Controller, HttpResponse, Validation } from "../contracts";
import { badRequest, notAcceptable, ok, serverError } from "../helpers";

export class AuthenticateController implements Controller{
    constructor(
        private readonly authenticate: Authenticate,
        private readonly validation: Validation
    ){}
    async handle(request: AuthenticateController.Request): Promise<HttpResponse>{
        try {
            const erro = this.validation.validate(request)
            if(erro){
                return badRequest(erro)
            }

            const {email, password} = request
            const result = await this.authenticate.auth({email, password}) as HttpResponse

            if('statusCode' in result && result.statusCode === 406) {
                return notAcceptable(result.body);
            }

            return ok(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace AuthenticateController {
    export type Request = {
        email: string,
        password: string
    }       
}