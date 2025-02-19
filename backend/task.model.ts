import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Task extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ defaultValue: false })
  completed: boolean;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  tags: string[];

  @Column({ type: DataType.DATE, allowNull: true })
  dueDate: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  declare createdAt: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  declare updatedAt: Date;
}
