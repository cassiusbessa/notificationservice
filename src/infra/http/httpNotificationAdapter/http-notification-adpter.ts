import { Notification } from 'src/app/entities/notification';

export class HTTPNotificationAdapter {
  static toHTTP(notification: Notification) {
    const { id, content, category, recipientId } = notification;
    return {
      id,
      content: content.value,
      category,
      recipientId,
    };
  }
}
