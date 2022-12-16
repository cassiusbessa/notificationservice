import { CountRecipientNotification } from './count-recipient-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from '../../../test/in-memory-notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { CancelNotification } from './cancel-notification';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const mockNotificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CountRecipientNotification(
      mockNotificationRepository,
    );

    await mockNotificationRepository.create(
      new Notification({
        recipientId: '1',
        content: new Content('Solicitação de pagamento'),
        category: 'payment',
      }),
    );

    await mockNotificationRepository.create(
      new Notification({
        recipientId: '1',
        content: new Content('Solicitação de amizade'),
        category: 'social',
      }),
    );

    await mockNotificationRepository.create(
      new Notification({
        recipientId: '2',
        content: new Content('Solicitação de amizade'),
        category: 'social',
      }),
    );

    const { count } = await cancelNotification.execute({
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
