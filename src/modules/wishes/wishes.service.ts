import { Injectable } from '@nestjs/common';
import { CreateWishesRequest, CreateWishesResponse } from './dto/create-wishes.dto';
import { FindAllWishesResponse } from './dto/find-all-wishes.dto';
import { Wishes } from './wishes.entity';
import { WishesRepository } from './wishes.repository';

@Injectable()
export class WishesService {
    constructor(private readonly wishesRepository: WishesRepository) {}

    async create(wishes: CreateWishesRequest): Promise<CreateWishesResponse> {
        const newWishes = new Wishes();

        newWishes.name = wishes.name;
        newWishes.wish = wishes.wish;

        return await this.wishesRepository.create(newWishes);
    }

    async findAll(): Promise<FindAllWishesResponse[]> {
        const wishes = await this.wishesRepository.findAll();

        const wishesResponse = wishes.map((wish) => {
            return {
                id: wish.id,
                name: wish.name,
                wish: wish.wish,
                created_at: wish.created_at,
                updated_at: wish.updated_at,
            };
        });

        return wishesResponse;
    }
}
