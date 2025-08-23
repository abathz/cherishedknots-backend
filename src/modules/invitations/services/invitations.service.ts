import { Injectable, NotFoundException } from '@nestjs/common';
import utils from '../../../utils';
import { CreateInvitationRequest } from '../dto/invitations/create-invitation.dto';
import { FindOneInvitationResponse } from '../dto/invitations/find-one-invitation.dto';
import { Invitations } from '../entities/invitations.entity';
import { InvitationsRepository } from '../repository/invitations.repository';

@Injectable()
export class InvitationsService {
    constructor(private readonly invitationsRepository: InvitationsRepository) {}

    async create(createUserId: number, invitations: CreateInvitationRequest) {
        const newInvitations = new Invitations();

        newInvitations.title = invitations.title;
        newInvitations.unique_id = utils.generateUniqueIdInvitation();
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
            created_at: invitation.created_at,
            updated_at: invitation.updated_at,
        };
    }
}
