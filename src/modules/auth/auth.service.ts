import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { LoginRequest, LoginResponse } from './dto/login.dto';
import { UsersRepository } from '../users/users.repository';
import { GetProfileResponse } from './dto/get-profile.dto';
import { InvitationsRepository } from '../invitations/repository/invitations.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly invitationsRepository: InvitationsRepository,
        private readonly jwtService: JwtService
    ) {}

    async login(login: LoginRequest): Promise<LoginResponse> {
        const user = await this.usersRepository.findByEmail(login.email);

        if (!user) throw new NotFoundException('User not found');

        if (!(await argon2.verify(user.password, login.password))) {
            throw new UnauthorizedException();
        }

        const accessToken = await this.jwtService.signAsync(
            { userId: user.id, email: user.email },
            { expiresIn: '2d' }
        );
        const refreshToken = await this.jwtService.signAsync(
            { userId: user.id, email: user.email },
            { secret: process.env.JWT_REFRESH_TOKEN_SECRET, expiresIn: '1d' }
        );

        return { accessToken, refreshToken };
    }

    async getProfile(id: number): Promise<GetProfileResponse> {
        const user = await this.usersRepository.findById(id);

        if (!user) throw new NotFoundException('User not found');

        const invitations = await this.invitationsRepository.findOneInvitationsByUser(user.id);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            invitations: invitations
                ? {
                      id: invitations.id,
                      name: invitations.name,
                  }
                : null,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }
}
