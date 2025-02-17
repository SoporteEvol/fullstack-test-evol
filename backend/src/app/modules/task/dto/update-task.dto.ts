import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'Título de la tarea',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Descripción de la tarea',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Indica si la tarea está completada',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({
    description: 'Etiquetas asociadas a la tarea',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({
    description: 'Fecha de vencimiento de la tarea',
    type: String,
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  dueDate?: string;
}
