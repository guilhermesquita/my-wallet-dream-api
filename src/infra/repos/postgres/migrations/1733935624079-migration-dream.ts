import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class MigrationDream1733935624079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_dreams',
        columns: [
          {
            name: 'id_dream',
            type: 'text',
            isPrimary: true
          },
          {
            name: 'name_dream',
            type: 'text'
          },
          {
            name: 'description_dream',
            type: 'text',
            isNullable: true
          },
          {
            name: 'time_expectation_dream',
            type: 'text'
          },
          {
            name: 'value_dream',
            type: 'float8'
          },
          {
            name: 'is_finished_dream',
            type: 'boolean',
            default: false
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
