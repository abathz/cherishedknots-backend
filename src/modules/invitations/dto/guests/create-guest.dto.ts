import { IsOptional, IsString } from 'class-validator';

export class CreateGuestRequest {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    phone_number: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsString()
    group_name: string;
}
