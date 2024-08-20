import { Controller } from "@/application/contracts"
import { ListUserByEmailController } from "@/application/controllers"
import { makeDbListUserByEmail } from "../../domain/usecases"
import { makePgTransactionController } from "../decorators"

export const makeListUserByEmailController = (): Controller => {
    const controller = new ListUserByEmailController(
        makeDbListUserByEmail(),
    )
    return makePgTransactionController(controller)
}   