import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RSVP } from '../entities/rsvp.entity';

@Injectable()
export class RSVPRepository {
    constructor(private readonly dataSource: DataSource) {}

    async create(rsvp: RSVP): Promise<RSVP> {
        return await this.dataSource.manager.save(rsvp);
    }

    async findAll(): Promise<RSVP[]> {
        return await this.dataSource.manager.find(RSVP);
    }
}
