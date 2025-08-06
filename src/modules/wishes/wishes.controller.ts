import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { WishesService } from './wishes.service';
import utils from '../../utils';
import { AuthGuard } from '../auth/auth.guard';
import { CreateWishesRequest } from './dto/create-wishes.dto';

@Controller('v1/wishes')
export class WishesController {
    constructor(private readonly wishesService: WishesService) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Res() res: Response, @Body() createWishesDto: CreateWishesRequest) {
        await this.wishesService.create(createWishesDto);
        utils.response(res, { StatusCode: HttpStatus.CREATED });
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Res() res: Response) {
        const users = await this.wishesService.findAll();
        utils.response(res, { StatusCode: HttpStatus.OK, Data: users });
    }

    @Get('public')
    async findAllPublic(@Res() res: Response) {
        const users = await this.wishesService.findAll();
        utils.response(res, { StatusCode: HttpStatus.OK, Data: users });
    }
}
