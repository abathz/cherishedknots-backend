import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import utils from '../../utils';
import { CreateUserRequest } from './dto/create-users.dto';
import { UpdateUserRequest } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller({ path: 'users', version: '1' })
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Res() res: Response, @Body() createUserDto: CreateUserRequest) {
        await this.usersService.create(createUserDto);
        utils.response(res, { StatusCode: HttpStatus.CREATED });
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Res() res: Response, @Param('id') id: number, @Body() updateUserDto: UpdateUserRequest) {
        await this.usersService.update(id, updateUserDto);
        utils.response(res, { StatusCode: HttpStatus.NO_CONTENT });
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Res() res: Response) {
        const users = await this.usersService.findAll();
        utils.response(res, { StatusCode: HttpStatus.OK, Data: users });
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Res() res: Response, @Param('id') id: number) {
        const user = await this.usersService.findById(id);
        utils.response(res, { StatusCode: HttpStatus.OK, Data: user });
    }
}
