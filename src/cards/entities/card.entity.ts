import { Category } from 'categories/entities/category.entity';
import { AutoIncrement, BelongsTo, Column, Default, Length, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

@Table
export class Card extends Model<Card> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  @Default([])
  tags: string[];

  @Unique
  @Length({ min: 5, max: 50 })
  @Column
  name: string;

  @Default('')
  @Column
  hint: string;

  // TODO add Image
  @Default(null)
  @Column
  image: any;

  @BelongsTo(() => Category)
  @Default(null)
  @Column
  category: Category;
}
