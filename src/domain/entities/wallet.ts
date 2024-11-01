// import { Profile } from './profile'

export class Wallet {
  id_wallet: number
  name_wallet: string
  description_wallet: string
  total_price_wallet: number
  fk_profile: string
  is_public: boolean
  created_at: Date
}
