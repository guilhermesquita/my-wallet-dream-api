import { Profile } from './profile'

export class Wallet {
  id_wallet: number
  name_wallet: string
  description_wallet: string
  total_price_wallet: number
  fk_profile: Profile
  is_public: boolean
  payment_day_wallet: number
  created_at: Date
}
