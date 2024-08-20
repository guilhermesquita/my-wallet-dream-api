import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('tbl_user')
export class PgUser {
    @PrimaryGeneratedColumn()
    id_user: number | string;

    @Column()
    nm_user: string;

    @Column()
    email_user: string;

    @Column()
    password_user: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}