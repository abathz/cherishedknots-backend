import { IsString } from 'class-validator';

export class CreateRSVPRequest {
    @IsString()
    response: string;
}
