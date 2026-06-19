import { Entity, Column, ForeignKey, PrimaryGeneratedColumn } from 'typeorm';
import { Invitations } from './invitations.entity';

@Entity('guests')
export class Guests {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int4')
    @ForeignKey(() => Invitations, 'id')
    invitation_id: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    phone_number: string;

    @Column('varchar')
    email: string;
}
