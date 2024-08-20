import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity('tbl_movie')
export class PgMovie extends BaseEntity{
    @PrimaryColumn({ type: "text" })
    id_movie: string;

    @Column()
    title_movie: string;

    @Column()
    director_movie: string;

    @Column()
    description_movie: string;

    @Column()
    image_movie: string;

    @Column()
    year_movie: string;
}