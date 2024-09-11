import { Profile } from './profile'

export class User {
  id_user: string
  email_user: string
  email_confirmed: boolean
  encripyted_password_user: string
  fk_identify_profile: Profile | string
  created_at: Date
}
