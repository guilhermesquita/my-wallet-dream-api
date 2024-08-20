import { v4 } from 'uuid'

export class UuidGenerator {
    public generate = (): string => {
        return v4()
    }
}