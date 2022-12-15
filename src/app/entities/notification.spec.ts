import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: '1',
      content: new Content('Nova notificação'),
      category: 'test',
    });

    expect(notification).toBeTruthy();
  });
});
