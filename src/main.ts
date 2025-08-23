import 'reflect-metadata';
import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { NetworkLogInterceptor } from './interceptors/network-log.interceptor';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: new ConsoleLogger({
            prefix: 'cherishedknots',
        }),
    });

    app.enableVersioning();
    app.useBodyParser('json', { limit: '20mb' });

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new NetworkLogInterceptor());

    await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
