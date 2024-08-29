import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMeasurementsTable1658231212427 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'measurements',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'image',
                    type: 'bytea',
                },
                {
                    name: 'URI',
                    type: 'varchar',
                },
                {
                    name: 'value',
                    type: 'integer',
                },
                {
                    name: 'customer_code',
                    type: 'varchar',
                },
                {
                    name: 'date',
                    type: 'timestamp',
                },
                {
                    name: 'type',
                    type: 'varchar',
                },
                {
                    name: 'has_confirmed',
                    type: 'boolean',
                    default: false,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('measurements');
    }
}