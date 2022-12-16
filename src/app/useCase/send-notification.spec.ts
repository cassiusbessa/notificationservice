import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

const notifications: Notification[] = [];

const mockNotificationRepository = {
  async create(notification: Notification): Promise<void> {
    notifications.push(notification);
  },
};

describe('SendNotification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(mockNotificationRepository);

    await sendNotification.execute({
      recipientId: '1',
      content: 'Nova notificação',
      category: 'test',
    });

    expect(notifications).toHaveLength(1);
  });
});
