import { Column, IsUrl, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'images' })
export class Image extends Model<Image> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @IsUrl
  @Column
  url: string;
}
