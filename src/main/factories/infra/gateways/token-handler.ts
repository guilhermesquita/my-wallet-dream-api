import { JwtTokenHandler } from '@/infra/gateways'

export const makeJwtTokenHandler = (): JwtTokenHandler => {
  return new JwtTokenHandler()
}
