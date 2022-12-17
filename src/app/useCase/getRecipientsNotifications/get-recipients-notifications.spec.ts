import { InMemoryNotificationsRepository } from '../../../../test/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotification } from './get-recipients-notifications';

describe('Get recipients notifications', () => {
  it('should be get recipient notifications', async () => {
    const mockNotificationRepository = new InMemoryNotificationsRepository();
    const GetNotification = new GetRecipientNotification(
      mockNotificationRepository,
    );

    await mockNotificationRepository.create(makeNotification());

    await mockNotificationRepository.create(makeNotification());

    await mockNotificationRepository.create(
      makeNotification({ recipientId: '2' }),
    );

    const { notifications } = await GetNotification.execute({
      recipientId: '1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: '1' }),
        expect.objectContaining({ recipientId: '1' }),
      ]),
    );
  });
});
