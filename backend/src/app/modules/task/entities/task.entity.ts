import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Tag } from '../../tag/entities/tag.entity';

@Table
export class Task extends Model<Task> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

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
    type: DataType.DATE,
    allowNull: true,
  })
  dueDate: Date;



  @BelongsToMany(() => Tag, 'TaskTags', 'taskId', 'tagId')
  tags: Tag[];
}
