import { Controller } from "@/application/contracts";
import { AuthenticateController } from "@/application/controllers";
import { makeDbAuthenticate } from "../../domain/usecases";
import { makePgTransactionController } from "../decorators";
import { makeAuthenticateValidation } from "./authenticate-validation-factory";

export const makeAuthenticateController = (): Controller => {
    const controller = new AuthenticateController(
        makeDbAuthenticate(),
        makeAuthenticateValidation()
    )
    return makePgTransactionController(controller)
}   