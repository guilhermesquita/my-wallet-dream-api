import { ListMovieAll } from "@/domain/contracts/repos";
import { DbListMovieAll } from "@/domain/usecases";
import { JwtTokenHandler } from "@/infra/gateways";
import { PgMovieRepository, PgUserRepository } from "@/infra/repos/postgres";

export const makeDbListMovieAll = (): ListMovieAll => {
    const pgUserRepository = new PgUserRepository()
    const pgMovieRepository = new PgMovieRepository()
    return new DbListMovieAll(pgMovieRepository, pgUserRepository, new JwtTokenHandler())
}