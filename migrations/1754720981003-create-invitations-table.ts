import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateInvitationsTable1754720981003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'invitations',
                columns: [
                    {
                        name: 'id',
                        type: 'serial4',
                        isPrimary: true,
                    },
                    {
                        name: 'created_user_id',
                        type: 'int4',
                        isNullable: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'unique_id',
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
            'invitations',
            new TableForeignKey({
                columnNames: ['created_user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableInvitations = await queryRunner.getTable('invitations');
        const foreignKeyInvitations = tableInvitations?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('created_user_id') !== -1
        );
        await queryRunner.dropForeignKey('invitations', foreignKeyInvitations!);

        await queryRunner.dropTable('invitations');
    }
}
