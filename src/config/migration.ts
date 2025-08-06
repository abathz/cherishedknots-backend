import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import * as typeOrm from 'typeorm';
import { TypeOrmConfigService } from './database';

dotenv.config();

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

const DatabaseConfiguration = new TypeOrmConfigService().DatabaseConfiguration;

const source = new typeOrm.DataSource({
    ...DatabaseConfiguration,
    migrations: migrations as typeOrm.MixedList<Function | string>,
});

export default source;
