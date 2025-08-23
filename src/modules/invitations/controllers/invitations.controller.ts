import { AuthGuard } from '@cherishedknots/guards/auth.guard';
import utils from '@cherishedknots/utils';
import { Body, Controller, HttpStatus, Post, Res, UseGuards, Request, Get, Param } from '@nestjs/common';
import type { Response } from 'express';
import { CreateInvitationRequest } from '../dto/invitations/create-invitation.dto';
import { InvitationsService } from '../services/invitations.service';

@Controller({ path: 'invitations', version: '1' })
@UseGuards(AuthGuard)
export class InvitationsController {
    constructor(private readonly invitationsService: InvitationsService) {}

    @Post()
    async createInvitation(
        @Request() req: any,
        @Res() res: Response,
        @Body() createInvitationDto: CreateInvitationRequest
    ) {
        await this.invitationsService.create(req.user.userId, createInvitationDto);
        utils.response(res, { StatusCode: HttpStatus.CREATED });
    }

    @Get(':id')
    async findOneInvitation(@Res() res: Response, @Param('id') id: number) {
        const invitation = await this.invitationsService.findOne(id);
        utils.response(res, { StatusCode: HttpStatus.OK, Data: invitation });
    }
}
