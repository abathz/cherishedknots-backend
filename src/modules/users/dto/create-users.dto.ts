import { IsString } from 'class-validator';

export class CreateUserRequest {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class CreateUserResponse {
    id: number;
    name: string;
    email: string;
}
