import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Events } from '../entities/events.entity';

@Injectable()
export class EventsRepository {
    constructor(private readonly dataSource: DataSource) {}

    async create(events: Events): Promise<Events> {
        return await this.dataSource.manager.save(events);
    }

    async findAll(): Promise<Events[]> {
        return await this.dataSource.manager.find(Events);
    }
}
