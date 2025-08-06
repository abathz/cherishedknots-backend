import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ForeignKey } from 'typeorm';
import { Users } from '../../users/users.entity';

@Entity('invitations')
export class Invitations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('int4')
    @ForeignKey(() => Users, 'id')
    created_user_id: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
