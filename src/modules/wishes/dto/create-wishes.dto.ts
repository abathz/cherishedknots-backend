import { IsString } from 'class-validator';

export class CreateWishesRequest {
    @IsString()
    name: string;

    @IsString()
    wish: string;
}

export class CreateWishesResponse {
    id: number;
    name: string;
    wish: string;
    created_at: Date;
    updated_at: Date;
}
