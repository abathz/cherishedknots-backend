import { Injectable } from '@nestjs/common';
import { CreateGuestRequest } from '../dto/guests/create-guest.dto';
import { Guests } from '../entities/guests.entity';
import { GuestsRepository } from '../repository/guests.repository';

@Injectable()
export class GuestsService {
    constructor(private readonly guestsRepository: GuestsRepository) {}

    async create(invitationId: number, guests: CreateGuestRequest[]) {
        const arrNewGuests: Guests[] = [];

        for (const guest of guests) {
            const newGuests = new Guests();

            newGuests.name = guest.name;
            newGuests.phone_number = guest.phone_number;
            newGuests.email = guest.email;
            newGuests.group_name = guest.group_name;
            newGuests.invitation_id = invitationId;

            arrNewGuests.push(newGuests);
        }

        return await this.guestsRepository.create(arrNewGuests);
    }
}
