import { HttpResponse } from '@/application/contracts'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
