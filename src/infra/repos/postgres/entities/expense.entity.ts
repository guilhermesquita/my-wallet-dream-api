import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { PgWallet } from './wallet.entity'

@Entity({ name: 'tbl_expenses', schema: 'public' })
export class PgExpense {
  @PrimaryColumn()
  id_expense: string

  @Column()
  name_expense: string

  @Column()
  value_expense: number

  @ManyToOne(() => PgWallet, wallet => wallet.expenses)
  @JoinColumn({ name: 'fk_wallet' })
  fk_wallet: PgWallet
}
