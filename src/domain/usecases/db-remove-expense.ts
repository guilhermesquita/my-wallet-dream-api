import { RemoveExpense } from '../contracts/repos'

export class DbRemoveExpense implements RemoveExpense {
  constructor(private readonly removeExpense: RemoveExpense) {}

  async remove(id: string): Promise<RemoveExpense.Result> {
    return await this.removeExpense.remove(id)
  }
}
