import { ListUserById } from "@/domain/contracts/repos";
import { DbListUserById } from "@/domain/usecases";
import { JwtTokenHandler } from "@/infra/gateways";
import { PgUserRepository } from "@/infra/repos/postgres";

export const makeDbListUserById = (): ListUserById => {
    const pgUserRepository = new PgUserRepository()
    return new DbListUserById(pgUserRepository, new JwtTokenHandler())
}