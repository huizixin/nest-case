import { Inject, Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

// 自定义日志服务
@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  getLogContext(context?: any) {
    console.log('getLogContext', context);
    // 返回日志上下文
    return {
      userId: '惠子鑫',
      context,
    };
  }

  log(message: any, context?: string) {
    this.logger.info(message, this.getLogContext(context));
  }
  error(message: any, context?: string) {
    this.logger.error(message, this.getLogContext(context));
  }
  warn(message: any, context?: string) {
    this.logger.warn(message, this.getLogContext(context));
  }
  debug?(message: any, context?: string) {
    this.logger.debug(message, this.getLogContext(context));
  }
  verbose?(message: any, context?: string) {
    this.logger.verbose(message, this.getLogContext(context));
  }
  fatal?(message: any, context?: string) {
    this.logger.error(message, {
      ...this.getLogContext(context),
      level: 'fatal',
    });
  }
}
