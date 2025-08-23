import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateEventsTable1754721029615 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'events',
                columns: [
                    {
                        name: 'id',
                        type: 'serial4',
                        isPrimary: true,
                    },
                    {
                        name: 'invitation_id',
                        type: 'int4',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'event_time',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                    {
                        name: 'location',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'maps_link',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                        default: 'now()',
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'events',
            new TableForeignKey({
                columnNames: ['invitation_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'invitations',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableEvents = await queryRunner.getTable('events');
        const foreignKeyEvents = tableEvents?.foreignKeys.find((fk) => fk.columnNames.indexOf('invitation_id') !== -1);
        await queryRunner.dropForeignKey('events', foreignKeyEvents!);

        await queryRunner.dropTable('events');
    }
}
