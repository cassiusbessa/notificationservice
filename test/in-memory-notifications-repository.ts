import { NotificationNotFound } from '@app/useCase/errors/notification-not-found';
import { Notification } from '@app/entities/notification';
import { NotificationRepository } from '@app/repositories/notifications-repository';

export class InMemoryNotificationsRepository implements NotificationRepository {
  public notifications: Notification[] = [];
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
  async findById(id: string): Promise<Notification | null> {
    return this.notifications.find((n) => n.id === id) || null;
  }
  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === notification.id);
    if (index === -1) {
      throw new NotificationNotFound();
    }
    this.notifications[index] = notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((n) => n.recipientId === recipientId);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((n) => n.recipientId === recipientId)
      .length;
  }
}
