import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const customFormat = winston.format.printf(info => {
  const { level, message, timestamp, userId, ...rest } = info;
  const contextStr = Object.keys(rest).length > 0 ? ` | ${JSON.stringify(rest)}` : '';

  return `${timestamp}: [${level}] [${userId}] ${message}${contextStr}`;
});

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => {
        const logDir = 'logs';
        const datePattern = 'YYYY-MM-DD';
        const maxFiles = '14d';
        const maxSize = '20m';
        const zippedArchive = true; // 是否压缩

        return {
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.errors({ stack: true }),
            winston.format.splat(),
            customFormat
          ),
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.colorize(),
                winston.format.splat(),
                customFormat
              ),
            }),
            new DailyRotateFile({
              dirname: logDir,
              filename: 'error-%DATE%.log',
              level: 'error',
              zippedArchive,
              maxSize,
              maxFiles,
              datePattern,
              format: winston.format.combine(
                winston.format.errors({
                  stack: true,
                })
              ),
            }),
            new DailyRotateFile({
              dirname: logDir,
              filename: 'logs/combined-%DATE%.log',
              zippedArchive,
              maxSize,
              maxFiles,
              datePattern,
              format: winston.format.combine(
                winston.format.errors({
                  stack: true,
                }),
                winston.format(info => {
                  // 🚫 过滤掉 error 日志，只保留非 error
                  if (info.level === 'error') {
                    return false; // 返回 false 表示丢弃该日志
                  }
                  return info;
                })()
                // customFormat
              ),
            }),
          ],
        };
      },
      inject: [],
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
