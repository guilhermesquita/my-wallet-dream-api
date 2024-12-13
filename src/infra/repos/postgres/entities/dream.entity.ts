import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { PgProfile } from './profile.entity'

@Entity({ name: 'tbl_dreams', schema: 'public' })
export class PgDream {
  @PrimaryColumn()
  id_dream: string

  @Column()
  name_dream: string

  @Column()
  description_dream: string

  @Column()
  time_expectation_dream: number

  @Column()
  value_dream: number

  @Column()
  is_finished_dream: boolean

  @ManyToOne(() => PgProfile, profile => profile.dreams)
  @JoinColumn({ name: 'fk_profile' })
  fk_profile: PgProfile
}
