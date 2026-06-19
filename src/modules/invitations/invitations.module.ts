import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationsController } from './controllers/invitations.controller';
import { Events } from './entities/events.entity';
import { Guests } from './entities/guests.entity';
import { Invitations } from './entities/invitations.entity';
import { RSVP } from './entities/rsvp.entity';
import { Wishes } from './entities/wishes.entity';
import { EventsRepository } from './repository/events.repository';
import { GuestsRepository } from './repository/guests.repository';
import { InvitationsRepository } from './repository/invitations.repository';
import { RSVPRepository } from './repository/rsvp.repository';
import { WishesRepository } from './repository/wishes.repository';
import { EventsService } from './services/events.service';
import { GuestsService } from './services/guests.service';
import { InvitationsService } from './services/invitations.service';
import { RSVPService } from './services/rsvp.service';
import { WishesService } from './services/wishes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Events, Guests, Invitations, RSVP, Wishes])],
    controllers: [InvitationsController],
    providers: [
        EventsService,
        GuestsService,
        InvitationsService,
        RSVPService,
        WishesService,

        EventsRepository,
        GuestsRepository,
        InvitationsRepository,
        RSVPRepository,
        WishesRepository,
    ],
    exports: [EventsRepository, GuestsRepository, InvitationsRepository, RSVPRepository, WishesRepository],
})
export class InvitationsModule {}
