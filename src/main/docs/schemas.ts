import { authSchema, bearerAuthSchema, editUserSchema, errorSchema } from './schemas/'
import { addUserSchema } from './schemas/add-user-schema'

export default {
  addUser: addUserSchema,
  authUser: authSchema,
  editUser: editUserSchema, 
  error: errorSchema
}
