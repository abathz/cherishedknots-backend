import { IsString } from 'class-validator';

export class UpdateUserRequest {
    @IsString()
    name: string;
}

export class UpdateUserResponse {
    id: number;
    name: string;
    email: string;
}
