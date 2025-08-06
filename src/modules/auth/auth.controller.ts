import { Body, Controller, Get, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import utils from '../../utils';
import { LoginRequest } from './dto/login.dto';

@Controller('v1')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Res() res: Response, @Body() body: LoginRequest) {
        const authToken = await this.authService.login(body);
        utils.response(res, { StatusCode: HttpStatus.OK, Data: authToken });
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Request() req: any, @Res() res: Response) {
        const authUser = await this.authService.getProfile(req.user.userId);
        utils.response(res, { StatusCode: HttpStatus.OK, Data: authUser });
    }
}
