import { Authenticate } from "@/domain/contracts/repos";
import { DbAuthenticate } from "@/domain/usecases";
import { PgUserRepository } from "@/infra/repos/postgres";

export const makeDbAuthenticate = (): Authenticate => {
    const pgUserRepository = new PgUserRepository()
    return new DbAuthenticate(pgUserRepository)
}