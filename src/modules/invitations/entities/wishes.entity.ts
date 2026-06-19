import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ForeignKey } from 'typeorm';
import { Invitations } from './invitations.entity';

@Entity('wishes')
export class Wishes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int4')
    @ForeignKey(() => Invitations, 'id')
    invitation_id: number;

    @Column('text')
    guest_name: string;

    @Column('text')
    wish: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
