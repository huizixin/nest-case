import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

import { type LoggerService } from '@nestjs/common';

@Catch(HttpException) // 只捕获http异常
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // host 代表整个程序的进程，可以通过这个拿到请求的上下文
    const response = ctx.getResponse(); // 拿到请求的响应
    const request = ctx.getRequest(); // 拿到请求的请求
    const status = exception.getStatus(); // 拿到异常的状态码

    this.logger.error(exception.message, exception.stack);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
