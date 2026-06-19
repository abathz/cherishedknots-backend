import { Body, Controller, Get, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.dto';
import { AuthGuard } from '../../guards/auth.guard';
import utils from '../../utils';

@Controller({ version: '1' })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Res() res: Response, @Body() body: LoginRequest) {
        const authToken = await this.authService.login(body);
        utils.response(res, { statusCode: HttpStatus.OK, data: authToken });
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Request() req: any, @Res() res: Response) {
        const authUser = await this.authService.getProfile(req.user.userId);
        utils.response(res, { statusCode: HttpStatus.OK, data: authUser });
    }
}
