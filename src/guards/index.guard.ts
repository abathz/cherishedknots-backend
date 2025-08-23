import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DbGuard } from './db.guard';

const GuardsProvider: Provider[] = [
    {
        provide: APP_GUARD,
        useClass: DbGuard,
    },
];

export default GuardsProvider;
