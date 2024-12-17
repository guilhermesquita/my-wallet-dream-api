import { RemoveDream } from '../contracts/repos'

export class DbRemoveDream implements RemoveDream {
  constructor(private readonly removeDream: RemoveDream) {}
  async remove(id: string): Promise<RemoveDream.Result> {
    return await this.removeDream.remove(id)
  }
}
