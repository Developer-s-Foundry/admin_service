import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Response } from 'express';
import { AppError } from './appError';
  
  
  @Catch()
  export class CustomErrorFilter implements ExceptionFilter {
    private readonly logger = new Logger(CustomErrorFilter.name);
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      // Handle known AppError
      if (exception instanceof AppError) {
        this.logger.warn(`AppError: ${exception.message}`);
  
        return response.status(exception.statusCode).json({
          status_code: exception.statusCode,
          message: exception.message,
          data: exception.data || null,
          timestamp: new Date().toISOString(),
        });
      }
  
      // Handle known NestJS HttpException
      if (exception instanceof HttpException) {
        const status = exception.getStatus();
        const message = exception.getResponse();
  
        this.logger.warn(`HttpException: ${JSON.stringify(message)}`);
  
        return response.status(status).json({
          status_code: status,
          message: message['message'] || message,
          error: exception.name,
          timestamp: new Date().toISOString(),
        });
      }
  
      // Fallback: unknown/unexpected error
      this.logger.error('Unhandled Error:', exception);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
      });
    }
  }
  