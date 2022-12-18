import { HttpException, HttpStatus } from '@nestjs/common';

export class PrismaNotificationNotFound extends HttpException {
  constructor() {
    super('Notification not found', HttpStatus.NOT_FOUND);
  }
}
