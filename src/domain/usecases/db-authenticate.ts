import { HttpResponse } from "@/application/contracts";
import { Authenticate } from "../contracts/repos";
import { notAcceptable } from "@/application/helpers";

export class DbAuthenticate implements Authenticate{
    constructor(
        private readonly authenticate: Authenticate
    ){}
    async auth(params: Authenticate.Params): Promise<Authenticate.Result | boolean | HttpResponse>{

        const authentication = await this.authenticate.auth(params)
        if(!authentication){
            return notAcceptable('Email ou senha incorreta')
        }

        return authentication
    };
}