import { Notification } from 'src/app/entities/notification';
import { Notification as rawNotification } from '@prisma/client';
import { Content } from 'src/app/entities/content';

export class PrismaNotificationAdpter {
  static toPrisma(notification: Notification) {
    const { id, content, category, recipientId, cancelledAt } = notification;
    return {
      id,
      content: content.value,
      category,
      recipientId,
      cancelledAt,
    };
  }

  static toDomain(prismaData: rawNotification): Notification {
    return new Notification(
      {
        category: prismaData.category,
        content: new Content(prismaData.content),
        recipientId: prismaData.recipientId,
        readAt: prismaData.readAt,
        cancelledAt: prismaData.cancelledAt,
        createdAt: prismaData.createdAt,
      },
      prismaData.id,
    );
  }
}
