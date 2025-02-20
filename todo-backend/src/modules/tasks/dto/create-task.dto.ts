import { IsArray, IsBoolean, IsISO8601, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsString({ message: 'El campo "title" debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El título no puede estar vacío' })
    @MaxLength(255, { message: 'El título no puede tener más de 255 caracteres' })
    title: string;
  
    @IsString({ message: 'El campo "description" debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    description: string;
  
    @IsOptional()
    @IsBoolean({ message: 'El campo "completed" debe ser un valor booleano (true o false)' })
    completed?: boolean;
  
    @IsOptional()
    @IsArray({ message: 'Las etiquetas deben ser un array de strings' })
    @IsString({ each: true, message: 'Cada etiqueta debe ser una cadena de texto' })
    tags?: string[];
  
    @IsOptional()
    @IsISO8601({}, { message: 'La fecha de vencimiento debe estar en formato ISO8601 (YYYY-MM-DD)' })
    dueDate?: Date;
}