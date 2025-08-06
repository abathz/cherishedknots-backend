import { Entity, Column, CreateDateColumn, ForeignKey, PrimaryGeneratedColumn } from 'typeorm';
import { Invitations } from './invitations.entity';

@Entity('guest_invitations')
export class GuestInvitations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    unique_id: number;

    @Column('int4')
    @ForeignKey(() => Invitations, 'id')
    invitation_id: number;

    @CreateDateColumn()
    created_at!: Date;
}
