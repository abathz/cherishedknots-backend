import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateInvitationRequest } from '../dto/invitations/create-invitation.dto';
import { FindOneInvitationResponse } from '../dto/invitations/find-one-invitation.dto';
import { Invitations } from '../entities/invitations.entity';
import { InvitationsRepository } from '../repository/invitations.repository';
import { WishesRepository } from '../repository/wishes.repository';

@Injectable()
export class InvitationsService {
    constructor(
        private readonly invitationsRepository: InvitationsRepository,
        private readonly wishesRepository: WishesRepository
    ) {}

    async create(createUserId: number, invitations: CreateInvitationRequest) {
        const newInvitations = new Invitations();

        newInvitations.title = invitations.title;
        newInvitations.unique_id = uuidV4();
        newInvitations.created_user_id = createUserId;

        return await this.invitationsRepository.create(newInvitations);
    }

    async findOne(id: number): Promise<FindOneInvitationResponse> {
        const invitation = await this.invitationsRepository.findOneByUser(id);

        if (!invitation) {
            throw new NotFoundException('Invitation not found');
        }

        return {
            id: invitation.id,
            title: invitation.title,
            uniqueId: invitation.unique_id,
            created_at: invitation.created_at,
            updated_at: invitation.updated_at,
        };
    }
}
