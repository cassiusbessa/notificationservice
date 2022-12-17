import { PrismaNotificationAdpter } from '../database/prisma/adapters/prisma-notifications-adapter';
import { NotificationRepository } from 'src/app/repositories/notifications-repository';
import { Notification } from 'src/app/entities/notification';
import { PrismaService } from '../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from 'src/app/useCase/errors/notification-not-found';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const prismaData = PrismaNotificationAdpter.toPrisma(notification);
    await this.prisma.notification.create({
      data: prismaData,
    });
  }

  async save(notification: Notification): Promise<void> {
    const prismaData = PrismaNotificationAdpter.toPrisma(notification);
    await this.prisma.notification.update({
      where: {
        id: prismaData.id,
      },
      data: prismaData,
    });
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    });
    if (!notification) {
      throw new NotificationNotFound();
    }
    return PrismaNotificationAdpter.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });
    return notifications.map(PrismaNotificationAdpter.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = this.prisma.notification.count({
      where: {
        recipientId,
      },
    });
    return count;
  }
}
