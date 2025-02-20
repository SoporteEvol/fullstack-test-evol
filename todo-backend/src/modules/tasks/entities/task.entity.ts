import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'tasks', timestamps: true })
export class Task extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column({ defaultValue: false })
  completed: boolean;

  @Column({ type: 'jsonb', allowNull: true })
  declare tags: string;

  @Column({ allowNull: true })
  dueDate: Date;
}