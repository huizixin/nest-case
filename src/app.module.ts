import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '@/shared/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
// 配置
import {
  appConfig,
  databaseConfig,
  jwtConfig,
  redisConfig,
  securityConfig,
  throttleConfig,
  uploadConfig,
  mailConfig,
} from './config';
import { PrismaService } from '@/shared/database/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        jwtConfig,
        redisConfig,
        securityConfig,
        throttleConfig,
        uploadConfig,
        mailConfig,
      ],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      expandVariables: true,
    }),

    // 共享模块
    LoggerModule, // 日志模块
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
