import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Task extends Model<Task> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed: boolean;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  tags: string[];

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dueDate: Date;
}
