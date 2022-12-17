import { CountRecipientNotification } from './count-recipient-notification';
import { InMemoryNotificationsRepository } from '../../../../test/in-memory-notifications-repository';
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
});
