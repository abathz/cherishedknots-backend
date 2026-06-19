import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateWishesTable1765103019804 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'wishes',
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
                        name: 'guest_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'wish',
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
            'wishes',
            new TableForeignKey({
                columnNames: ['invitation_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'invitations',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableEvents = await queryRunner.getTable('wishes');
        const foreignKeyEvents = tableEvents?.foreignKeys.filter((fk) =>
            ['invitation_id'].some((col) => fk.columnNames.includes(col))
        );
        await queryRunner.dropForeignKeys('wishes', foreignKeyEvents!);
        await queryRunner.dropTable('wishes');
    }
}
