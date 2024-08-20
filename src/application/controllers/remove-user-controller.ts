import { RemoveUser } from "@/domain/contracts/repos";
import { notAcceptable, ok, serverError, unauthorized } from "../helpers";
import { Controller, HttpResponse } from "../contracts";

export class RemoveUserController implements Controller{
    constructor(
        private readonly removeUser: RemoveUser
    ){}
    async handle(request: RemoveUserController.Request): Promise<HttpResponse>{
        try {
            const {id, authorization} = request
            const result = await this.removeUser.remove({id, token: authorization})

            if ('statusCode' in result && result.statusCode === 406) {
                return notAcceptable(result.message);
            }

            if ('statusCode' in result && result.statusCode === 401) {
                return unauthorized();
            }
        
            return ok(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace RemoveUserController {
    export type Request = {
        id: number
        authorization: string
    }
}