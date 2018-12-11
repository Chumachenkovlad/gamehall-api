import { Card } from 'cards/entities/card.entity';
import { Category } from 'categories/entities/category.entity';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'Sequelize',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'duelapi'
      });
      sequelize.addModels([User, Category, Card]);
      await sequelize.sync();
      return sequelize;
    }
  }
];
