import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { Configurations } from './constants';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    const config = this.envConfig[key];

    if (config === undefined) {
      throw new Error(`Couldn't be found '${key}' configuration`);
    }

    return this.envConfig[key];
  }

  get jwtSecret(): string {
    return this.get(Configurations.JWT_SECRET);
  }

  get tokenExpirationTime(): number {
    return Number(this.get(Configurations.TOKEN_EXPIRATION_TIME));
  }

  get defaultLimit(): number {
    return Number(this.get(Configurations.DEFAULT_LIMIT));
  }

  get superuserIds(): number[] {
    return this.get(Configurations.SUPERUSER_IDS)
      .split(',')
      .map(Number);
  }

  get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }
}
