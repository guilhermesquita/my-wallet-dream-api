import { ListMovieById } from "@/domain/contracts/repos";
import { DbListMovieById } from "@/domain/usecases";
import { JwtTokenHandler } from "@/infra/gateways";
import { PgMovieRepository } from "@/infra/repos/postgres";

export const makeDbListMovieById = (): ListMovieById => {
    const pgMovieRepository = new PgMovieRepository()
    return new DbListMovieById(pgMovieRepository, new JwtTokenHandler())
}