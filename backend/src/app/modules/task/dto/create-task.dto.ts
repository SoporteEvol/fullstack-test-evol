import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'terminar proyecto',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'terminar definiciones dto del proyecto',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Indica si la tarea está completada o no',
    example: false,
  })
  @IsBoolean()
  completed: boolean;

  @ApiProperty({
    description: 'Etiquetas asociadas a la tarea',
    type: [String],
    example: ['proyecto', 'desarrollo', 'dto'],
  })
  @IsArray()
  @ArrayNotEmpty()
  tags: string[];

  @ApiProperty({
    description: 'Fecha límite para completar la tarea',
    example: '2025-02-28',
    required: false,
  })
  @IsISO8601()
  dueDate?: string;
}
