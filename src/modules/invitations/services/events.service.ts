import { Injectable } from '@nestjs/common';
import { CreateEventRequest } from '../dto/events/create-event.dto';
import { Events } from '../entities/events.entity';
import { EventsRepository } from '../repository/events.repository';

@Injectable()
export class EventsService {
    constructor(private readonly eventsRepository: EventsRepository) {}

    async create(invitationId: number, events: CreateEventRequest) {
        const newEvents = new Events();

        newEvents.title = events.title;
        newEvents.event_time = events.event_time;
        newEvents.map_link = events.map_link;
        newEvents.invitation_id = invitationId;

        return await this.eventsRepository.create(newEvents);
    }
}
