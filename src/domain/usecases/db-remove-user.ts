import { unauthorized } from "@/application/helpers";
import { ListUserById, RemoveUser } from "../contracts/repos";
import { JwtTokenHandler } from "@/infra/gateways";
import { HttpResponse } from "@/application/contracts";

export class DbRemoveUser implements RemoveUser {
    constructor(
        private readonly removeUser: RemoveUser,
        private readonly checkUserExistsById: ListUserById,
        private readonly jwtTokenHandler: JwtTokenHandler
    ){}
    async remove(user: RemoveUser.Params): Promise<RemoveUser.Result | HttpResponse>{

        let idExists = false

        await this.checkUserExistsById.ListById({id: user.id, token:user.token}) ? idExists = true : idExists = false

        if(!idExists){
            return {
                id: Number(user.id),
                statusCode: 406,
                message: 'Usuário não encontrado!'
            }
        }

        if (!user.token) {
            return unauthorized();
        }

        const auth = user.token.split(' ')[1];
        const idValidate = await this.jwtTokenHandler.validate({token: auth});

        if(!this.checkUserExistsById.ListById({id: Number(idValidate), token: auth})){
            return unauthorized();
        }

        if(Number(idValidate) !== Number(user.id)){
            return {
                id: Number(user.id),
                statusCode: 401,
                message: 'Sem autorização para remover este usuário!'
            }
        }

        return await this.removeUser.remove(user)
    };
}