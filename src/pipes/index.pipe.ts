import { Provider } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { RequestValidationPipe } from './request-validation.pipe';

const PipesProvider: Provider[] = [
    {
        provide: APP_PIPE,
        useClass: RequestValidationPipe,
    },
];

export default PipesProvider;
