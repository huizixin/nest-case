import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './shared/logger/logger.service';
import { HttpExceptionFilter } from './shared/filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    snapshot: true
  });

  // 自定义日志服务
  const loggerService = app.get(LoggerService)
  app.useLogger(loggerService)

  // 全局异常过滤器, 只能有一个全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter(loggerService))

  const host = process.env.HOST ?? 'localhost'
  const port = process.env.PORT ?? 3000

  await app.listen(port, host);

  loggerService.log(`🚀 Application is running on: http://${host}:${port}`);
}
bootstrap();
