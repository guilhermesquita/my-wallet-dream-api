import { AddDream } from '../contracts/repos'

export class DbAddDream implements AddDream {
  constructor(private readonly addDream: AddDream) {}
  async add(dream: AddDream.params): Promise<AddDream.result> {
    return await this.addDream.add(dream)
  }
}
