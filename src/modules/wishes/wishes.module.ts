import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesController } from './wishes.controller';
import { Wishes } from './wishes.entity';
import { WishesRepository } from './wishes.repository';
import { WishesService } from './wishes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Wishes])],
    controllers: [WishesController],
    providers: [WishesService, WishesRepository],
    exports: [WishesRepository],
})
export class WishesModule {}
