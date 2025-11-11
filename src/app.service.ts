import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const userInfo = {
      isAdmin: false,
    };
    if (!userInfo.isAdmin) {
      throw new HttpException('无权限', HttpStatus.FORBIDDEN);
    }
    return 'Hello World!';
  }
}
