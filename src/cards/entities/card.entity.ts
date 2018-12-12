import { Injectable } from '@nestjs/common';
import { Category } from 'categories/entities/category.entity';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DefaultScope,
  Length,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@DefaultScope({
  include: [() => Category]
})
@Injectable()
@Table
export class Card extends Model<Card> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // @Column({ type: DataType.ARRAY(DataType.STRING) })
  // tags: string[];

  @Unique
  @Length({ min: 5, max: 50 })
  @Column
  name: string;

  @Column
  hint: string;

  // TODO add Image
  @Column
  image: string;

  @BelongsTo(() => Category, 'categoryId')
  category: Category;
}
