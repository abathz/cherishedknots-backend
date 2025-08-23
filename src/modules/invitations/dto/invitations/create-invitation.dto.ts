import { IsString } from 'class-validator';

export class CreateInvitationRequest {
    @IsString()
    title: string;
}
