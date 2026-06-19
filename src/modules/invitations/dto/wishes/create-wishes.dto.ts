import { IsString } from 'class-validator';

export class CreateWishesRequest {
    @IsString()
    guest_name: string;

    @IsString()
    wish: string;

    invitation_id: number;
}

export class CreateWishesResponse {
    id: number;
    guest_name: string;
    wish: string;
    created_at: Date;
    updated_at: Date;
}
