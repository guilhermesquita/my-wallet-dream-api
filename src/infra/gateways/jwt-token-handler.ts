import { TokenGenerator, TokenValidator } from '@/domain/contracts/gateways'
import { JwtPayload, sign, verify } from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGenerator, TokenValidator {
  async generate({
    expirationInMs,
    key
  }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, process.env.JWT_SECRET ?? '', {
      expiresIn: expirationInSeconds
    })
  }

  async validate({
    token
  }: TokenValidator.Input): Promise<TokenValidator.Output> {
    const payload = verify(token, process.env.JWT_SECRET ?? '') as JwtPayload
    return payload.key
  }
}
