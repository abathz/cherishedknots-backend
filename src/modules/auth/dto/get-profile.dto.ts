import { FindByIdUsersResponse } from '../../users/dto/find-by-id-users.dto';

export class GetProfileResponse extends FindByIdUsersResponse {
    invitations: {
        id: number;
        title: string;
        unique_id: string;
    } | null;
}
