import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ForeignKey } from 'typeorm';
import { Guests } from './guests.entity';
import { Invitations } from './invitations.entity';

@Entity('rsvp')
export class RSVP {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int4')
    @ForeignKey(() => Invitations, 'id')
    invitation_id: number;

    @Column('int4')
    @ForeignKey(() => Guests, 'id')
    guest_id: number;

    @Column('varchar')
    response: string;

    @CreateDateColumn()
    created_at: Date;
}
