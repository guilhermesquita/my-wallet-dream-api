import { Profile } from '@/domain/entities'

export interface AddDream {
  add: (dream: AddDream.params) => Promise<AddDream.result>
}

export namespace AddDream {
  export type params = {
    name: string
    description: string
    time_expectation: number
    value: number
    fk_profile: string | Profile
  }
  export type result = {
    id: string
    statusCode: number
    message: string
  }
}
