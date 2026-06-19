import { Body, Controller, HttpStatus, Post, Res, UseGuards, Request, Get, Param } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '../../../guards/auth.guard';
import utils from '../../../utils';
import { CreateInvitationRequest } from '../dto/invitations/create-invitation.dto';
import { CreateWishesRequest } from '../dto/wishes/create-wishes.dto';
import { InvitationsService } from '../services/invitations.service';
import { WishesService } from '../services/wishes.service';

@Controller({ path: 'invitations', version: '1' })
@UseGuards(AuthGuard)
export class InvitationsController {
    constructor(
        private readonly invitationsService: InvitationsService,
        private readonly wishesService: WishesService
    ) {}

    @Post()
    async createInvitation(
        @Request() req: any,
        @Res() res: Response,
        @Body() createInvitationDto: CreateInvitationRequest
    ) {
        await this.invitationsService.create(req.user.userId, createInvitationDto);
        utils.response(res, { statusCode: HttpStatus.CREATED });
    }

    @Get(':id')
    async findOneInvitation(@Res() res: Response, @Param('id') id: number) {
        const invitation = await this.invitationsService.findOne(id);
        utils.response(res, { statusCode: HttpStatus.OK, data: invitation });
    }

    @Post(':id/wishes')
    async createInvitationWishes(
        @Res() res: Response,
        @Param('id') id: number,
        @Body() createWishesDto: CreateWishesRequest
    ) {
        const newWish = { ...createWishesDto, invitation_id: id };
        await this.wishesService.create(newWish);
        utils.response(res, { statusCode: HttpStatus.OK });
    }

    @Get(':id/wishes')
    async findAllInvitationWishes(@Res() res: Response, @Param('id') id: number) {
        const invitation = await this.wishesService.findAllByInvitation(id);
        utils.response(res, { statusCode: HttpStatus.OK, data: invitation });
    }
}
