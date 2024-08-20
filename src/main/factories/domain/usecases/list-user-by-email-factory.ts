import { ListUserByEmail } from "@/domain/contracts/repos";
import { DbListUserByEmail } from "@/domain/usecases";
import { PgUserRepository } from "@/infra/repos/postgres";

export const makeDbListUserByEmail = (): ListUserByEmail => {
    const pgUserRepository = new PgUserRepository()
    return new DbListUserByEmail(pgUserRepository)
}