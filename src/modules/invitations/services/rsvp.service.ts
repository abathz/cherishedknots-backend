import { Injectable } from '@nestjs/common';
import { CreateRSVPRequest } from '../dto/rsvp/create-rsvp.dto';
import { RSVP } from '../entities/rsvp.entity';
import { RSVPRepository } from '../repository/rsvp.repository';

@Injectable()
export class RSVPService {
    constructor(private readonly rsvpRepository: RSVPRepository) {}

    async create(invitationId: number, guestId: number, rsvp: CreateRSVPRequest) {
        const newRSVP = new RSVP();

        newRSVP.response = rsvp.response;
        newRSVP.invitation_id = invitationId;
        newRSVP.guest_id = guestId;

        return await this.rsvpRepository.create(newRSVP);
    }
}
