import { Controller } from "@/application/contracts"
import { ListMovieByIdController } from "@/application/controllers"
import { makeDbListMovieById } from "../../domain/usecases"
import { makePgTransactionController } from "../decorators"

export const makeListMovieByIdController = (): Controller => {
    const controller = new ListMovieByIdController(
        makeDbListMovieById(),
    )
    return makePgTransactionController(controller)
}   