import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('tbl_profiles')
export class PgProfile {
  @PrimaryColumn()
  id_profile: string

  @Column()
  username_profile: string

  @Column()
  img_profile: string
}
