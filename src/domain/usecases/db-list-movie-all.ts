import { JwtTokenHandler } from "@/infra/gateways";
import { unauthorized } from "@/application/helpers";
import { ListMovieAll, ListUserById } from "../contracts/repos";

export class DbListMovieAll implements ListMovieAll {
    constructor(
        private readonly listMovieAll: ListMovieAll,
        private readonly checkUserExistsById: ListUserById,
        private readonly jwtTokenHandler: JwtTokenHandler
    ) { }

    async listAll(token: string): Promise<ListMovieAll.Result> {
        if (!token) {
            return unauthorized();
        }

        const auth = token.split(' ')[1];
        const idValidate = await this.jwtTokenHandler.validate({token: auth});

        if(!this.checkUserExistsById.ListById({id: Number(idValidate), token: auth})){
            return unauthorized();
        }


        return await this.listMovieAll.listAll(token)
    };
}