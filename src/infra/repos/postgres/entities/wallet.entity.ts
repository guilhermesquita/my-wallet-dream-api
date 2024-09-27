import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { PgProfile } from './profile.entity'

@Entity({ schema: 'public', name: 'tbl_wallets' })
export class PgWallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_wallet: number

  @Column()
  name_wallet: string

  @Column()
  total_price_wallet: string

  @Column()
  description_wallet: string

  @Column()
  is_public: boolean

  @ManyToOne(() => PgProfile, profile => profile.wallets)
  @JoinColumn({ name: 'fk_profile' })
  fk_profile: PgProfile

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date
}
