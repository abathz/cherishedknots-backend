import { FindByIdUsersResponse } from '../../users/dto/find-by-id-users.dto';

export class GetProfileResponse extends FindByIdUsersResponse {
    invitations: {
        id: number;
        name: string;
    } | null;
}
