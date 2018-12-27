import { Injectable } from '@nestjs/common';
import { Category } from 'categories/entities/category.entity';
import { CommonErrors } from 'common/enums/errors';
import { Image } from 'images/image.entity';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DefaultScope,
  HasOne,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@DefaultScope({
  include: [
    {
      model: () => Category
    },
    {
      model: () => Image
    }
  ]
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
  @Length({
    min: 5,
    max: 50,
    msg: CommonErrors.LENGTH_ERR
  })
  @Column({
    unique: {
      name: 'cards_index',
      msg: CommonErrors.NOT_UNIQUE_ERR
    }
  })
  name: string;

  @Column
  hint: string;

  // TODO add Image
  @HasOne(() => Image, 'imageId')
  image: Image;

  @BelongsTo(() => Category, 'categoryId')
  category: Category;
}
