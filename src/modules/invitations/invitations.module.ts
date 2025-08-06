import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationsController } from './controllers/invitations.controller';
import { GuestInvitations } from './entities/guest-invitations.entity';
import { Invitations } from './entities/invitations.entity';
import { InvitationsRepository } from './repository/invitations.repository';
import { GuestInvitationsService } from './services/guest-invitations.service';
import { InvitationsService } from './services/invitations.service';

@Module({
    imports: [TypeOrmModule.forFeature([Invitations, GuestInvitations])],
    controllers: [InvitationsController],
    providers: [InvitationsService, GuestInvitationsService, InvitationsRepository],
    exports: [InvitationsRepository],
})
export class InvitationsModule {}
