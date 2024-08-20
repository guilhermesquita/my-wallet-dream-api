import { RemoveUser } from "@/domain/contracts/repos";
import { DbRemoveUser } from "@/domain/usecases";
import { JwtTokenHandler } from "@/infra/gateways";
import { PgUserRepository } from "@/infra/repos/postgres";

export const makeDbRemoveUser = (): RemoveUser => {
    const pgUserRepository = new PgUserRepository()
    return new DbRemoveUser(pgUserRepository, pgUserRepository, new JwtTokenHandler())
}