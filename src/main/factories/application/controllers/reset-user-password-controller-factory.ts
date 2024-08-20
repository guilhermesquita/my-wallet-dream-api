import { Controller } from "@/application/contracts";
import { ResetUserPasswordController } from "@/application/controllers";
import { makeDbResetUserPassword } from "../../domain/usecases";
import { makePgTransactionController } from "../decorators";
import { makeResetUserPasswordValidation } from "./reset-user-password-validation-factory";

export const makeResetUserPasswordController = (): Controller => {
    const controller = new ResetUserPasswordController(
        makeDbResetUserPassword(),
        makeResetUserPasswordValidation()
    )
    return makePgTransactionController(controller)
}   