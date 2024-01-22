import { Table, Column, Model, DataType, PrimaryKey,CreatedAt, UpdatedAt, IsUrl, Default, ForeignKey, BelongsTo, HasOne, AutoIncrement } from 'sequelize-typescript';
import { User } from './user';
import { Flag } from './flag';

@Table
export class Property extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(()=> User)
  @Column
  ownerid: number

  @BelongsTo(()=> User)
  user: User

  @Default('available')
  @Column(DataType.ENUM('available','sold'))
  status: string;


  @Column(DataType.FLOAT)
  price: number;

  @Column(DataType.STRING(50))
  city: string

  @Column(DataType.STRING(150))
  address: string

  @Column(DataType.STRING(50))
  type: string

   @IsUrl
  @Column(DataType.STRING(255))
  imageurl: string

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @HasOne(()=> Flag)
  flag: Flag
}
