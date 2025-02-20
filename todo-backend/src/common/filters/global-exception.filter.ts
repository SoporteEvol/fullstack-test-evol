import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError, UniqueConstraintError, DatabaseError } from 'sequelize';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ocurrió un error inesperado';
    let errorData: any = null;

    // 📌 Manejo de errores HTTP
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || message;
        errorData = exceptionResponse;
      }
    } 
    
    // 📌 Manejo de errores de Sequelize
    else if (exception instanceof ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Error de validación en la base de datos';
      errorData = exception.errors.map(err => err.message);
    }
    else if (exception instanceof UniqueConstraintError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Violación de restricción única';
      errorData = exception.errors.map(err => err.message);
    }
    else if (exception instanceof DatabaseError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Error en la base de datos';
      errorData = exception.message;
    }

    // 📌 Loggear errores inesperados
    else {
      this.logger.error('Error inesperado:', exception);
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      errorData,
      timestamp: new Date().toISOString(),
    });
  }
}
