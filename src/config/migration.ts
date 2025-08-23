import * as dotenv from 'dotenv';
import { TypeOrmConfigService } from './database';

dotenv.config();

const typeormService = new TypeOrmConfigService();

export default typeormService.runMigrations();
