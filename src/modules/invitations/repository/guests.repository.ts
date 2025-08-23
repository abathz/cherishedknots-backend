import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Guests } from '../entities/guests.entity';

@Injectable()
export class GuestsRepository {
    constructor(private readonly dataSource: DataSource) {}

    async create(guests: Guests[]): Promise<Guests[]> {
        return await this.dataSource.manager.save(guests);
    }

    async findAll(): Promise<Guests[]> {
        return await this.dataSource.manager.find(Guests);
    }
}
