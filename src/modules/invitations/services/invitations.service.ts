import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvitationRequest, CreateInvitationResponse } from '../dto/create-invitation.dto';
import { FindOneInvitationResponse } from '../dto/find-one-invitation.dto';
import { Invitations } from '../entities/invitations.entity';
import { InvitationsRepository } from '../repository/invitations.repository';

@Injectable()
export class InvitationsService {
    constructor(private readonly invitationsRepository: InvitationsRepository) {}

    async createInvitation(
        createUserId: number,
        invitations: CreateInvitationRequest
    ): Promise<CreateInvitationResponse> {
        const newInvitations = new Invitations();

        newInvitations.name = invitations.name;
        newInvitations.created_user_id = createUserId;

        return await this.invitationsRepository.createInvitations(newInvitations);
    }

    async findOneInvitation(id: number): Promise<FindOneInvitationResponse> {
        const invitation = await this.invitationsRepository.findOneInvitationsByUser(id);

        if (!invitation) {
            throw new NotFoundException('Invitation not found');
        }

        return {
            id: invitation.id,
            name: invitation.name,
            created_at: invitation.created_at,
            updated_at: invitation.updated_at,
        };
    }
}
