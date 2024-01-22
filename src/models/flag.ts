import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, AutoIncrement } from 'sequelize-typescript';
import { Property } from './property';

@Table
export class Flag extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(()=> Property)
  @Column
  propertyid: number

  @BelongsTo(()=> Property)
  property: Property

  @Column(DataType.STRING(150))
  reason: string

  @Column(DataType.STRING(255))
  description: string

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

}
