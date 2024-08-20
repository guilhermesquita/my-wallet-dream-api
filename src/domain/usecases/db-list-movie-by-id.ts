import { JwtTokenHandler } from "@/infra/gateways";
import { ListMovieById } from "../contracts/repos";
import { forbidden, noContent, unauthorized } from "@/application/helpers";
import { AccessDeniedError } from "@/application/errors";

export class DbListMovieById implements ListMovieById {
    constructor(
        private readonly ListMovieById: ListMovieById,
        private readonly jwtTokenHandler: JwtTokenHandler
    ){}

   async ListById(movie: ListMovieById.Params): Promise<ListMovieById.Result>{
    if (!movie.token) {
        return forbidden(new AccessDeniedError());
    }

    const movieById = this.ListMovieById

    const checkById = await movieById.ListById(movie)
    if (!checkById) {
        return noContent();
    }

    const auth = movie.token.split(' ')[1];
    const idValidate = await this.jwtTokenHandler.validate({ token: auth });

    if (!movieById.ListById({id: idValidate, token: auth})) {
        return unauthorized();
    }

    return await this.ListMovieById.ListById(movie)
   };
}