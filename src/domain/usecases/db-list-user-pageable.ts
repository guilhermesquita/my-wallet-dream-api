import { forbidden, unauthorized } from "@/application/helpers";
import { ListUserById, ListUserPageable } from "../contracts/repos";
import { AccessDeniedError } from "@/application/errors";
import { HttpResponse } from "@/application/contracts";
import { JwtTokenHandler } from "@/infra/gateways";

export class DbListUserPageable implements ListUserPageable {
    constructor(
        private readonly listUserPageableRepository: ListUserPageable,
        private readonly checkUserExistsById: ListUserById,
        private readonly jwtTokenHandler: JwtTokenHandler
    ) {}
    async listPageable(params: ListUserPageable.Params): Promise<ListUserPageable.Result | HttpResponse>{
        if (!params.token) {
            return forbidden(new AccessDeniedError());
        }

        const auth = params.token.split(' ')[1];
        const idValidate = await this.jwtTokenHandler.validate({token: auth});

        if(!this.checkUserExistsById.ListById({id: Number(idValidate), token: auth})){
            return unauthorized();
        }

        return await this.listUserPageableRepository.listPageable(params)
    };
}