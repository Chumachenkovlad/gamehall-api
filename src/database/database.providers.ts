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
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE
      });
      sequelize.addModels([User, Category, Card, Image]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService]
  }
];
