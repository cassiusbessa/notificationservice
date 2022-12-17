import { UnreadNotification } from './unread-notification';
import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from '../errors/notification-not-found';
import { InMemoryNotificationsRepository } from '@test/in-memory-notifications-repository';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const mockNotificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new UnreadNotification(
      mockNotificationRepository,
    );

    const notification = makeNotification();
    await mockNotificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(mockNotificationRepository.notifications[0].readAt).toBe(null);
  });

  it('should not be able to cancel a non existing notification', async () => {
    const mockNotificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new UnreadNotification(
      mockNotificationRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
