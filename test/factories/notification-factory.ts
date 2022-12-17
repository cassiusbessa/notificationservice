import { Content } from '../../src/app/entities/content';
import { Notification } from '../../src/app/entities/notification';

type Override = Partial<Notification>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    recipientId: '1',
    content: new Content('Solicitação de pagamento'),
    category: 'payment',
    ...override,
  });
}
