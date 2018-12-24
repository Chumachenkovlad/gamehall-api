import { Injectable } from '@nestjs/common';
import { Category } from 'categories/entities/category.entity';
import { CommonErrors } from 'common/enums/errors';
import { AutoIncrement, BelongsTo, Column, DefaultScope, Length, Model, PrimaryKey, Table } from 'sequelize-typescript';

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
  @Column
  image: string;

  @BelongsTo(() => Category, 'categoryId')
  category: Category;
}
