import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'tasks' })
export class Task extends Model<Task> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ defaultValue: false })
  completed: boolean;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  tags: string[];

  @Column({ type: DataType.DATE, allowNull: false })
  dueDate: Date;
}
