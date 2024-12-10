import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { PgProfile } from './profile.entity'
import { PgExpense } from './expense.entity'

@Entity({ schema: 'public', name: 'tbl_wallets' })
export class PgWallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_wallet: number

  @Column()
  name_wallet: string

  @Column()
  total_price_wallet: number

  @Column()
  description_wallet: string

  @Column()
  payment_day_wallet: number

  @Column()
  is_public: boolean

  @ManyToOne(() => PgProfile, profile => profile.wallets)
  @JoinColumn({ name: 'fk_profile' })
  fk_profile: PgProfile

  @OneToMany(() => PgExpense, expense => expense.fk_wallet)
  expenses: PgExpense[]

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date
}
