import { AUTH, MOVIES, USERS } from "@/utils/constants";
import { userPath } from "./paths/user-path";
import { authenticatePath } from "./paths/authenticate-path";
import { userParamsPath } from "./paths/user-params-path";
import { moviePath } from "./paths/movie-path";
import { movieParamsPath } from "./paths/movie-params-path";

export default {
    [`/${USERS}`]: userPath,
    [`/${AUTH}`]: authenticatePath,
    [`/${USERS}/{id}`]: userParamsPath,

    [`/${MOVIES}`]: moviePath,
    [`/${MOVIES}/{id}`]: movieParamsPath,
}