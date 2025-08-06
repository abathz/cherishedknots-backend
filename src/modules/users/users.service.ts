import { Injectable, NotFoundException } from '@nestjs/common';
import argon2 from 'argon2';
import { CreateUserRequest, CreateUserResponse } from './dto/create-users.dto';
import { FindAllUsersResponse } from './dto/find-all-users.dto';
import { FindByIdUsersResponse } from './dto/find-by-id-users.dto';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-users.dto';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(user: CreateUserRequest): Promise<CreateUserResponse> {
        const newUser = new Users();

        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = await argon2.hash(user.password);

        return await this.usersRepository.create(newUser);
    }

    async findAll(): Promise<FindAllUsersResponse[]> {
        const users = await this.usersRepository.findAll();

        const usersResponse = users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at,
            };
        });

        return usersResponse;
    }

    async findById(id: number): Promise<FindByIdUsersResponse> {
        const users = await this.usersRepository.findById(id);

        if (!users) {
            throw new NotFoundException('User not found');
        }

        return {
            id: users.id,
            name: users.name,
            email: users.email,
            created_at: users.created_at,
            updated_at: users.updated_at,
        };
    }

    async findByEmail(email: string): Promise<FindByIdUsersResponse> {
        const users = await this.usersRepository.findByEmail(email);

        if (!users) {
            throw new NotFoundException('User not found');
        }

        return {
            id: users.id,
            name: users.name,
            email: users.email,
            created_at: users.created_at,
            updated_at: users.updated_at,
        };
    }

    async update(id: number, user: UpdateUserRequest): Promise<UpdateUserResponse> {
        const userToUpdate = await this.usersRepository.findById(id);

        if (!userToUpdate) {
            throw new NotFoundException('failed to update');
        }

        userToUpdate.name = user.name;
        const updatedUser = await this.usersRepository.update(userToUpdate);

        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
        };
    }
}
