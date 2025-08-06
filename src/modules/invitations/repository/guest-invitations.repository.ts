import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GuestInvitations } from '../entities/guest-invitations.entity';

@Injectable()
export class GuestInvitationsRepository {
    constructor(private readonly dataSource: DataSource) {}

    async create(guestInvitations: GuestInvitations): Promise<GuestInvitations> {
        return await this.dataSource.manager.save(guestInvitations);
    }
}
