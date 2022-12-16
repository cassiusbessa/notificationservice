import { InMemoryNotificationsRepository } from '../../../test/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('SendNotification', () => {
  it('should be able to send a notification', async () => {
    const mockNotificationRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(mockNotificationRepository);

    const { notification } = await sendNotification.execute({
      recipientId: '1',
      content: 'Nova notificação',
      category: 'test',
    });

    expect(mockNotificationRepository.notifications).toHaveLength(1);
    expect(mockNotificationRepository.notifications[0]).toEqual(notification);
  });
});
