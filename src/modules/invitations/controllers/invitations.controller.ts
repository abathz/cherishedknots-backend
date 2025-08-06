import { Body, Controller, HttpStatus, Post, Res, UseGuards, Request, Get, Param } from '@nestjs/common';
import type { Response } from 'express';
import utils from '../../../utils';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateInvitationRequest } from '../dto/create-invitation.dto';
import { InvitationsService } from '../services/invitations.service';

@Controller('v1/invitations')
@UseGuards(AuthGuard)
export class InvitationsController {
    constructor(private readonly invitationsService: InvitationsService) {}

    @Post()
    async createInvitation(
        @Request() req: any,
        @Res() res: Response,
        @Body() createInvitationDto: CreateInvitationRequest
    ) {
        await this.invitationsService.createInvitation(req.user.userId, createInvitationDto);
        utils.response(res, { StatusCode: HttpStatus.CREATED });
    }

    @Get(':id')
    async findOneInvitation(@Res() res: Response, @Param('id') id: number) {
        const invitation = await this.invitationsService.findOneInvitation(id);
        utils.response(res, { StatusCode: HttpStatus.OK, Data: invitation });
    }
}
