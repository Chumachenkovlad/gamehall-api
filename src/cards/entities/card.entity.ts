import { Injectable } from '@nestjs/common';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  HasOne,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Category } from '../../categories/category.entity';
import { CommonErrors } from '../../common';
import { Image } from '../../images/image.entity';

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
@Table({
  tableName: 'cards'
})
export class Card extends Model<Card> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // @Column({ type: DataType.ARRAY(DataType.STRING) })
  // tags: string[];
  @Length({
    min: 2,
    max: 50,
    msg: CommonErrors.LENGTH_ERR
  })
  @Column({
    type: DataType.STRING
  })
  name: string;

  @Column
  hint: string;

  @Column
  imageId: number;

  @Column({
    type: DataType.FLOAT
  })
  frequency: number;

  @HasOne(() => Image, 'imageId')
  image: Image;

  @Column
  categoryId: number;

  @BelongsTo(() => Category, 'categoryId')
  category: Category;
}
