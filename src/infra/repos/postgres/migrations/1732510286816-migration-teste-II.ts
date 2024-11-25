import { MigrationInterface, QueryRunner } from 'typeorm'

export class MigrationTesteII1732510286816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.testeII (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100) UNIQUE
        );
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
