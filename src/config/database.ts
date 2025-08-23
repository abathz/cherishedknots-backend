import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, MixedList } from 'typeorm';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    private DatabaseConfiguration: DataSourceOptions = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    };

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return { ...this.DatabaseConfiguration, synchronize: false, logging: true, autoLoadEntities: true };
    }

    runMigrations() {
        const migrationsDir = path.resolve(__dirname, '../../migrations');
        const migrations = fs
            .readdirSync(migrationsDir)
            .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
            .map((file) => {
                const filePath = path.join(migrationsDir, file);
                const module = require(filePath);

                const exported = Object.values(module)[0];
                if (!exported) {
                    console.warn(`[migrationLoader] ${file} has no export.`);
                }
                return exported;
            });

        const source = new DataSource({
            ...this.DatabaseConfiguration,
            migrations: migrations as MixedList<Function | string>,
        });

        return source;
    }
}
