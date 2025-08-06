import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database';
import { RequestValidationPipe } from './config/request-validation';
import { AuthModule } from './modules/auth/auth.module';
import { InvitationsModule } from './modules/invitations/invitations.module';
import { UserModule } from './modules/users/users.module';
import { WishesModule } from './modules/wishes/wishes.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        }),
        AuthModule,
        UserModule,
        WishesModule,
        InvitationsModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useClass: RequestValidationPipe,
        },
    ],
})
export class AppModule {}
