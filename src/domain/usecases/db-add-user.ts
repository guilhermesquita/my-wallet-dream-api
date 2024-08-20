import { HttpResponse } from "@/application/contracts";
import { AddUser, CheckUserByEmail } from "../contracts/repos";
import { conflict } from "@/application/helpers";

export class DbAddUser implements AddUser {
    constructor(
        private readonly addUser: AddUser,
        private readonly checkUserByEmail: CheckUserByEmail
    ) { }
    async add(user: AddUser.Params): Promise<AddUser.Result | HttpResponse> {
        const userExists = await this.checkUserByEmail.check(user.email)
        if (userExists) {
            return conflict()
        }
        
        return await this.addUser.add(user)
    };
}