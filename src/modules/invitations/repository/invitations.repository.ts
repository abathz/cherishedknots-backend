import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Invitations } from '../entities/invitations.entity';

@Injectable()
export class InvitationsRepository {
    constructor(private readonly dataSource: DataSource) {}

    async create(invitations: Invitations): Promise<Invitations> {
        return await this.dataSource.manager.save(invitations);
    }

    async findOneByUser(createUserId: number): Promise<Invitations | null> {
        return await this.dataSource.manager.findOneBy(Invitations, { created_user_id: createUserId });
    }

    async findOne(id: number): Promise<Invitations | null> {
        return await this.dataSource.manager.findOneBy(Invitations, { id });
    }
}
