import { CanActivate, ExecutionContext, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DbGuard implements CanActivate {
    constructor(private readonly dataSource: DataSource) {}

    async canActivate(_context: ExecutionContext): Promise<boolean> {
        try {
            if (this.dataSource.isInitialized) {
                return await new Promise((resolve) => resolve(true));
            }
            return await new Promise((resolve) => resolve(false));
        } catch {
            throw new ServiceUnavailableException('Database unavailable');
        }
    }
}
