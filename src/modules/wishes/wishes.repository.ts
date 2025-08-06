import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Wishes } from './wishes.entity';

@Injectable()
export class WishesRepository {
    constructor(private readonly dataSource: DataSource) {}

    async create(wishes: Wishes): Promise<Wishes> {
        return await this.dataSource.manager.save(wishes);
    }

    async findAll(): Promise<Wishes[]> {
        return await this.dataSource.manager.find(Wishes);
    }
}
