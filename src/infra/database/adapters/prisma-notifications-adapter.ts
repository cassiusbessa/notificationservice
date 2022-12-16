import { Notification } from 'src/app/entities/notification';

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
}
