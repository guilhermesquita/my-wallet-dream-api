import { HttpResponse } from '@/application/contracts'

export interface Middleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>
}
