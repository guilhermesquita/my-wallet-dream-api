import { Controller } from "@/application/contracts"
import { ListUserByIdController } from "@/application/controllers"
import { makeDbListUserById } from "../../domain/usecases"
import { makePgTransactionController } from "../decorators"

export const makeListUserByIdController = (): Controller => {
    const controller = new ListUserByIdController(
        makeDbListUserById(),
    )
    return makePgTransactionController(controller)
}   