import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateRsvpTable1754721040554 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rsvp',
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
                        name: 'guest_id',
                        type: 'int4',
                    },
                    {
                        name: 'response',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                        default: 'now()',
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'rsvp',
            new TableForeignKey({
                columnNames: ['invitation_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'invitations',
                onDelete: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'rsvp',
            new TableForeignKey({
                columnNames: ['guest_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'guests',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableEvents = await queryRunner.getTable('events');
        const foreignKeyEvents = tableEvents?.foreignKeys.filter((fk) =>
            ['invitation_id', 'guest_id'].some((col) => fk.columnNames.includes(col))
        );
        await queryRunner.dropForeignKeys('events', foreignKeyEvents!);

        await queryRunner.dropTable('events');
    }
}
