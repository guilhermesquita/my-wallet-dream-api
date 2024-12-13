export class InvalidTokenError extends Error {
  constructor() {
    super('Invalid token entered')
    this.name = 'InvalidTokenError'
  }
}
