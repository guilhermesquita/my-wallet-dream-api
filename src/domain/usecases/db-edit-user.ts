import { notAcceptable, unauthorized } from "@/application/helpers";
import { EditUser, ListUserById } from "../contracts/repos";
import { JwtTokenHandler } from "@/infra/gateways";
import { HttpResponse } from "@/application/contracts";

export class DbEditUser implements EditUser {
    constructor(
        private readonly EditUser: EditUser,
        private readonly checkUserExistsById: ListUserById,
        private readonly jwtTokenHandler: JwtTokenHandler
    ){}
    async edit(user: EditUser.Params): Promise<EditUser.Result | HttpResponse>{

        let idExists = false

        await this.checkUserExistsById.ListById({id: user.id, token:user.token}) ? idExists = true : idExists = false

        if(!idExists){
            return notAcceptable('Usuário não encontrado')
        }

        if (!user.token) {
            return unauthorized();
        }

        const auth = user.token.split(' ')[1];
        const idValidate = await this.jwtTokenHandler.validate({token: auth});

        if(Number(idValidate) !== Number(user.id)){
            return unauthorized()
        }

        if(!this.checkUserExistsById.ListById({id: Number(idValidate), token: auth})){
            return unauthorized();
        }

        return await this.EditUser.edit(user)
    };
}