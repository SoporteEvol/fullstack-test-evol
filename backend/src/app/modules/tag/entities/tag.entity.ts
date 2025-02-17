import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Task } from '../../task/entities/task.entity';

@Table
export class Tag extends Model<Tag> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Task, 'TaskTags', 'tagId', 'taskId')
  tasks: Task[];
}
