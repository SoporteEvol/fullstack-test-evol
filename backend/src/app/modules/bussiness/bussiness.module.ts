import { Module } from '@nestjs/common';
import { TagModule } from '../tag/tag.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule, TagModule],
})
export class Bussinessmodule {}
