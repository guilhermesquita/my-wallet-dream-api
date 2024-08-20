import { Controller } from "@/application/contracts";
import { RemoveUserController } from "@/application/controllers";
import { makeDbRemoveUser } from "../../domain/usecases";
import { makePgTransactionController } from "../decorators";

export const makeRemoveUserController = (): Controller => {
    const controller = new RemoveUserController(
        makeDbRemoveUser()
    )
    return makePgTransactionController(controller)
}   