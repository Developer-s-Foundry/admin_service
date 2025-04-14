import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { hostname } from 'os';
import { config } from './config.service';


const { combine, timestamp, printf, errors, colorize } = winston.format;

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    level: config().log.level || 'info', // Add fallback for log level
    format: combine(
      errors({ stack: true }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      colorize({ all: true }),
      printf(({ timestamp, level, message, stack, context }) => {
        return `${timestamp} [${level}] [${context || stack}] ${message}`;
      }),
    ),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        dirname: `logs/${hostname()}/combined`,
        filename: 'combined',
        extension: '.log',
        level: config().isProduction ? 'info' : 'debug',
      }),
      new DailyRotateFile({
        dirname: `logs/${hostname()}/error`,
        filename: 'errors',
        extension: '.log',
        level: 'error',
      }),
    ],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warning(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.notice(message);
  }
}
