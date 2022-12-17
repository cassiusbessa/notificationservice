import { CountRecipientNotification } from './count-recipient-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from '../../../test/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const mockNotificationRepository = new InMemoryNotificationsRepository();
    const countNotification = new CountRecipientNotification(
      mockNotificationRepository,
    );

    await mockNotificationRepository.create(makeNotification());

    await mockNotificationRepository.create(makeNotification());

    await mockNotificationRepository.create(
      makeNotification({ recipientId: '2' }),
    );

    const { count } = await countNotification.execute({
      recipientId: '1',
    });

    expect(count).toBe(2);
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
