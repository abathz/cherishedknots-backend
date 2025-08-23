import { IsOptional, IsString } from 'class-validator';

export class CreateEventRequest {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    event_time: string;

    @IsOptional()
    @IsString()
    map_link: string;
}
