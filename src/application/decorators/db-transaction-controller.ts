import {
  DbTransaction,
  Controller,
  HttpResponse
} from '@/application/contracts'

export class DbTransactionController implements Controller {
  constructor(
    private readonly decoratee: Controller,
    private readonly db: DbTransaction
  ) {}

  async handle(httpRequest: any): Promise<HttpResponse> {
    await this.db.openTransaction()
    try {
      const httpResponse = await this.decoratee.handle(httpRequest)
      await this.db.commit()
      return httpResponse
    } catch (error) {
      await this.db.rollback()
      throw error
    } finally {
      await this.db.closeTransaction()
    }
  }
}
