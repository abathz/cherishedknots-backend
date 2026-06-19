import { Injectable } from '@nestjs/common';
import { CreateWishesRequest, CreateWishesResponse } from '../dto/wishes/create-wishes.dto';
import { FindAllWishesResponse } from '../dto/wishes/find-all-wishes.dto';
import { Wishes } from '../entities/wishes.entity';
import { WishesRepository } from '../repository/wishes.repository';

@Injectable()
export class WishesService {
    constructor(private readonly wishesRepository: WishesRepository) {}

    async create(wishes: CreateWishesRequest): Promise<CreateWishesResponse> {
        const newWishes = new Wishes();

        newWishes.guest_name = wishes.guest_name;
        newWishes.wish = wishes.wish;
        newWishes.invitation_id = wishes.invitation_id;

        return await this.wishesRepository.create(newWishes);
    }

    async findAllByInvitation(invitationId: number): Promise<FindAllWishesResponse[]> {
        const wishes = await this.wishesRepository.findAllByInvitation(invitationId);

        const wishesResponse = wishes.map((wish) => {
            return {
                id: wish.id,
                guest_name: wish.guest_name,
                wish: wish.wish,
                created_at: wish.created_at,
                updated_at: wish.updated_at,
            };
        });

        return wishesResponse;
    }

    async findAllPublic(): Promise<FindAllWishesResponse[]> {
        const wishes = await this.wishesRepository.findAll();

        const wishesResponse = wishes.map((wish) => {
            return {
                id: wish.id,
                guest_name: wish.guest_name,
                wish: wish.wish,
                created_at: wish.created_at,
                updated_at: wish.updated_at,
            };
        });

        return wishesResponse;
    }
}
