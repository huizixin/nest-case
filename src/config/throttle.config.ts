import { registerAs } from '@nestjs/config';

/**
 * 限流配置
 * 用于 API 请求速率限制
 */
export const throttleConfig = registerAs('throttle', () => ({
  // 短时限流（秒级）
  short: {
    ttl: parseInt(process.env.THROTTLE_SHORT_TTL || '1000', 10) || 1000, // 1秒
    limit: parseInt(process.env.THROTTLE_SHORT_LIMIT || '20', 10) || 20, // 20次
  },

  // 中时限流（分钟级）
  medium: {
    ttl: parseInt(process.env.THROTTLE_MEDIUM_TTL || '60000', 10) || 60000, // 1分钟
    limit: parseInt(process.env.THROTTLE_MEDIUM_LIMIT || '200', 10) || 200, // 200次
  },

  // 长时限流（小时级）
  long: {
    ttl: parseInt(process.env.THROTTLE_LONG_TTL || '3600000', 10) || 3600000, // 1小时
    limit: parseInt(process.env.THROTTLE_LONG_LIMIT || '2000', 10) || 2000, // 2000次
  },
}));
