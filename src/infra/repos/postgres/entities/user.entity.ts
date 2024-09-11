import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  JoinColumn,
  OneToOne
} from 'typeorm'
import { PgProfile } from './profile.entity'
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

  @OneToOne(() => PgProfile, profile => profile.user)
  @JoinColumn({ name: 'fk_identify_profile' })
  fk_identify_profile: PgProfile

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date
}
