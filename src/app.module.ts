import PipesProvider from '@cherishedknots/pipes';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database';
import GuardsProvider from './guards/index.guard';
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
    providers: [...GuardsProvider, ...PipesProvider],
})
export class AppModule {}
