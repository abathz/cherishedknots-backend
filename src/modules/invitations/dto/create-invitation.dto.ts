import { IsString } from 'class-validator';

export class CreateInvitationRequest {
    @IsString()
    name: string;
}

export class CreateInvitationResponse {
    id: number;
    name: string;
}
