import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';
import { TagService } from './tag.service';
@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagService) {}

  @Get()
  async getTags(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }
}
