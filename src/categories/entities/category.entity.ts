import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'categories'
})
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @Column
  description: string;
}
