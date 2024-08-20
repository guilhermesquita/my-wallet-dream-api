import { ResetUserPassword } from "@/domain/contracts/repos";
import { badRequest, created, notAcceptable, serverError, unauthorized } from "../helpers";
import { Controller, HttpResponse, Validation } from "../contracts";

export class ResetUserPasswordController implements Controller{
    constructor(
        private readonly resetUserPassword: ResetUserPassword,
        private readonly validation: Validation
    ){}
    async handle(request: ResetUserPasswordController.Request): Promise<HttpResponse>{
        try {
            const erro = this.validation.validate(request)
            if(erro){
                return badRequest(erro)
            }
            const { password, email } = request
            const result = await this.resetUserPassword.reset({ password, email })
            return created(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace ResetUserPasswordController {
    export type Request = {
        password: string
        email: string
    }
}