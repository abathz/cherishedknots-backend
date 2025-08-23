import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateGuestsTable1754721025185 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'guests',
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
                        name: 'name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'group_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'guests',
            new TableForeignKey({
                columnNames: ['invitation_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'invitations',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableGuests = await queryRunner.getTable('guests');
        const foreignKeyGuests = tableGuests?.foreignKeys.find((fk) => fk.columnNames.indexOf('invitation_id') !== -1);
        await queryRunner.dropForeignKey('guests', foreignKeyGuests!);

        await queryRunner.dropTable('guests');
    }
}
