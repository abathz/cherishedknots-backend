import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersRepository {
    constructor(private readonly dataSource: DataSource) {}

    async create(user: Users): Promise<Users> {
        return await this.dataSource.manager.save(user);
    }

    async findAll(): Promise<Users[]> {
        return await this.dataSource.manager.find(Users);
    }

    async findById(id: number): Promise<Users | null> {
        return await this.dataSource.manager.findOneBy(Users, { id });
    }

    async findByEmail(email: string): Promise<Users | null> {
        return await this.dataSource.manager.findOneBy(Users, { email });
    }

    async update(user: Users): Promise<Users> {
        return await this.dataSource.manager.save(user);
    }
}
