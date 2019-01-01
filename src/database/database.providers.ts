import { Sequelize } from 'sequelize-typescript';

import { Card } from '../cards/entities/card.entity';
import { Category } from '../categories/category.entity';
import { ConfigService } from '../config/config.service';
import { Image } from '../images/image.entity';
import { User } from '../users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'Sequelize',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.get('DB_HOST'),
        port: 3306,
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_ROOT_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        define: {
          collate: 'utf8mb4_unicode_ci'
        }
      });
      sequelize.addModels([User, Category, Card, Image]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService]
  }
];
