import { noContent } from "@/application/helpers";
import { ListUserByEmail } from "../contracts/repos/list-user-by-email";

export class DbListUserByEmail implements ListUserByEmail {
    constructor(
        private readonly ListUserByEmail: ListUserByEmail
    ){}

   async ListByEmail(user: ListUserByEmail.Params): Promise<ListUserByEmail.Result>{
    
    const userListed = await this.ListUserByEmail.ListByEmail(user)
    
    if(!userListed){
        return noContent()
    }

    return await this.ListUserByEmail.ListByEmail(user)
   };
}