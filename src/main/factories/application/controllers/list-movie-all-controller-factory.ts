import { Controller } from "@/application/contracts"
import { ListMovieAllController } from "@/application/controllers"
import { makeDbListMovieAll } from "../../domain/usecases"
import { makePgTransactionController } from "../decorators"

export const makeListMovieAllController = (): Controller => {
    const controller = new ListMovieAllController(
        makeDbListMovieAll(),
    )
    return makePgTransactionController(controller)
}   