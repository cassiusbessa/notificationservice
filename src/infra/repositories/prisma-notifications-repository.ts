import { PrismaNotificationAdpter } from '../database/adapters/prisma-notifications-adapter';
import { NotificationRepository } from 'src/app/repositories/notifications-repository';
import { Notification } from 'src/app/entities/notification';
import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationAdpter.toPrisma(notification);
    await this.prisma.notification.create({
      data: raw,
    });
  }
}
