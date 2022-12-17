import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/app/repositories/notifications-repository';
import { PrismaNotificationsRepository } from '../repositories/prisma-notifications-repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
