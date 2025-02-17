import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';

export class FilterTaskDTO {
  @ApiProperty({
    description: 'Estado de la tarea: completada o no',
    required: false,
    type: Boolean,
  })
  @IsOptional()
  completed?: string;

  @ApiProperty({
    description: 'Fecha de inicio para filtrar tareas',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @ApiProperty({
    description: 'Fecha de fin para filtrar tareas',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsISO8601()
  endDate?: string;
}
