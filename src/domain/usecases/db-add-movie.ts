import { HttpResponse } from "@/application/contracts";
import { AddMovie, ListUserById } from "../contracts/repos";
import { JwtTokenHandler } from "@/infra/gateways";
import { unauthorized } from "@/application/helpers";

export class DbAddMovie implements AddMovie {
    constructor(
        private readonly addMovie: AddMovie,
        private readonly checkUserExistsById: ListUserById,
        private readonly jwtTokenHandler: JwtTokenHandler
    ) { }
    async add(movie: AddMovie.Params): Promise<AddMovie.Result | HttpResponse> {

        if (!movie.token) {
            return unauthorized();
        }

        const auth = movie.token.split(' ')[1];
        const idValidate = await this.jwtTokenHandler.validate({token: auth});

        if(!this.checkUserExistsById.ListById({id: Number(idValidate), token: auth})){
            return unauthorized();
        }

        return await this.addMovie.add(movie)
    };
}