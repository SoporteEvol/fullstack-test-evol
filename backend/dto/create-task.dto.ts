import { IsString, IsBoolean, IsOptional, IsArray, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
