import { TaskResponseDto } from '../dto/response-task.dto';

import { Task } from '../entities/task.entity';

export function taskToDto(task: Task): TaskResponseDto {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    tags: task.tags ? task.tags.map((tag) => tag.name) : [],
    dueDate: task.dueDate ? task.dueDate.toISOString() : undefined,
    createdAt: task.createdAt ? task.createdAt.toISOString() : null,
    updatedAt: task.updatedAt ? task.updatedAt.toISOString() : null,
  };
}
