export class MaxSizeParamError extends Error {
  constructor(paramName: string, size: number) {
    super(`Max size limit ${size} of: ${paramName} exceeded`)
    this.name = 'MaxSizeParamError'
  }
}
