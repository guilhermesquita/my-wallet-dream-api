import { Router } from "express";
import { adaptExpressRoute as adapt } from '../adapters'
import { makeAddMovieController, makeListMovieAllController, makeListMovieByIdController } 
from "../factories/application/controllers";

export default (router: Router): void => {
    router.post('/movies', adapt(makeAddMovieController()));
    router.get('/movies', adapt(makeListMovieAllController()));
    router.get('/movies/:id', adapt(makeListMovieByIdController()));
}