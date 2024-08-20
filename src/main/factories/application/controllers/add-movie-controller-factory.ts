import { Controller } from "@/application/contracts";
import { AddMovieController } from "@/application/controllers";
import { makeDbAddMovie } from "../../domain/usecases";
import { makePgTransactionController } from "../decorators";
import { makeAddMovieValidation } from "./add-movie-validation-factory";

export const makeAddMovieController = (): Controller => {
    const controller = new AddMovieController(
        makeDbAddMovie(),
        makeAddMovieValidation()
    )
    return makePgTransactionController(controller)
}   