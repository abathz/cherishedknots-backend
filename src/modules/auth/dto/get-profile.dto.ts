import { FindOneInvitationResponse } from '../../invitations/dto/invitations/find-one-invitation.dto';
import { FindByIdUsersResponse } from '../../users/dto/find-by-id-users.dto';

export class GetProfileResponse extends FindByIdUsersResponse {
    invitation: Pick<FindOneInvitationResponse, 'id' | 'title' | 'uniqueId'> | null;
}
