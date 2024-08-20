import { AddMovie } from "@/domain/contracts/repos";
import { DbAddMovie } from "@/domain/usecases";
import { JwtTokenHandler } from "@/infra/gateways";
import { PgMovieRepository, PgUserRepository } from "@/infra/repos/postgres";

export const makeDbAddMovie = (): AddMovie => {
    const pgMovieRepository = new PgMovieRepository()
    const pgUseRepository = new PgUserRepository()
    return new DbAddMovie(pgMovieRepository, pgUseRepository, new JwtTokenHandler())
}