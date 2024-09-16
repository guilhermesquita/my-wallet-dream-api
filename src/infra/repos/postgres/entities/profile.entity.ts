import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm'
import { PgUser } from './user.entity'

@Entity({ schema: 'public', name: 'tbl_profiles' })
export class PgProfile {
  @PrimaryColumn()
  id_profile: string

  @Column()
  username_profile: string

  @Column()
  img_profile: string

  @OneToOne(() => PgUser, user => user.fk_identify_profile)
  user: PgUser
}
