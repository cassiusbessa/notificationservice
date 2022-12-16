import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from '../../../test/in-memory-notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { CancelNotification } from './cancel-notification';

describe('SendNotification', () => {
  it('should be able to send a notification', async () => {
    const mockNotificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      mockNotificationRepository,
    );

    const notification = new Notification({
      recipientId: '1',
      content: new Content('Nova notificação'),
      category: 'test',
    });

    await mockNotificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(mockNotificationRepository.notifications[0].cancelledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const mockNotificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      mockNotificationRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
