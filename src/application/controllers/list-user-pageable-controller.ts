import { ListUserPageable } from "@/domain/contracts/repos";
import { Controller, HttpResponse, Validation } from "../contracts";
import { badRequest, createObjectByFields, noContent, ok, serverError } from "../helpers";

export class ListUserPageableController implements Controller {
    constructor(
        private readonly listUserPageable: ListUserPageable,
        private readonly validation: Validation
    ){}
    async handle(
        request: ListUserPageableController.Request
      ): Promise<HttpResponse> {
        try {
          const error = this.validation.validate(request)
          if (error) {
            return badRequest(error)
          }
    
          const filter = createObjectByFields(request, false, {
            name: '',
            email: '',
            created_at_start: '',
            created_at_end: ''
          })
    
          const pageable = createObjectByFields(request, true, {
            order: 'DESC',
            orderBy: 'id_user',
            pageNumber: 1,
            size: 10
          })
    
          const users = await this.listUserPageable.listPageable({
            token: request.authorization,
            pageable,
            filter
          })
          return users ? ok(users) : noContent()
        } catch (error: any) {
          return serverError(error)
        }
      }
    }
    
    export namespace ListUserPageableController {
      export type Request = Token & Pageable & FilterUser

      export type Token = {
        authorization: string
      }
    
      export type Pageable = {
        pageNumber: number
        size: number
        orderBy: string
        order: string
      }
    
      export type FilterUser = {
        name?: string
        email?: string
        created_at_start?: Date
        created_at_end?: Date
      }
    }