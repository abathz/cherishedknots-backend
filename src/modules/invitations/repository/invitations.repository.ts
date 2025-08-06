import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Invitations } from '../entities/invitations.entity';

@Injectable()
export class InvitationsRepository {
    constructor(private readonly dataSource: DataSource) {}

    async createInvitations(invitations: Invitations): Promise<Invitations> {
        return await this.dataSource.manager.save(invitations);
    }

    async findOneInvitationsByUser(createUserId: number): Promise<Invitations | null> {
        return await this.dataSource.manager.findOneBy(Invitations, { created_user_id: createUserId });
    }

    async findOneInvitations(id: number): Promise<Invitations | null> {
        return await this.dataSource.manager.findOneBy(Invitations, { id });
    }
}
