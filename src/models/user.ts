import { Table, Column, Model, HasMany, DataType, PrimaryKey, Unique, CreatedAt, UpdatedAt, Default, AllowNull, AutoIncrement } from 'sequelize-typescript';
import { Property } from './property';

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(100))
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  lastName: string

  @AllowNull(false)
  @Column(DataType.STRING(255))
  password: string

  @Column(DataType.STRING(150))
  address: string

  @Default(false)
  @Column(DataType.BOOLEAN)
  isAdmin: boolean

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @HasMany(()=> Property)
  properties: []
}
