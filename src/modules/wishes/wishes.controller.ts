import { AuthGuard } from '@cherishedknots/guards/auth.guard';
import utils from '@cherishedknots/utils';
import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { CreateWishesRequest } from './dto/create-wishes.dto';
import { WishesService } from './wishes.service';

@Controller({ path: 'wishes', version: '1' })
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
