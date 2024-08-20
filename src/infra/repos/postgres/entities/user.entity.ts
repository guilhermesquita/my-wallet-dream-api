import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm'

@Entity('tbl_users')
export class PgUser {
  @PrimaryColumn()
  id_user: string

  @Column()
  email_user: string

  @Column()
  encripyted_password_user: string

  @Column()
  email_confirmed: boolean

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date
}
