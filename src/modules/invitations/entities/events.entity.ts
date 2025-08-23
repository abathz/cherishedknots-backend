import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ForeignKey } from 'typeorm';
import { Invitations } from './invitations.entity';

@Entity('events')
export class Events {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int4')
    @ForeignKey(() => Invitations, 'id')
    invitation_id: number;

    @Column('varchar')
    title: string;

    @Column('timestamp with time zone')
    event_time: string;

    @Column('varchar')
    location: string;

    @Column('varchar')
    map_link: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
