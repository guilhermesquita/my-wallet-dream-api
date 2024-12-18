import { Profile } from './profile'

export class Dream {
  id_dream: string
  name_dream: string
  description_dream: string
  time_expectation_dream: number
  value_dream: number
  is_finished_dream: boolean
  fk_profile: Profile
}
