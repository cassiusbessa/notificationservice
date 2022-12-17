import { SendNotification } from '@app/useCase/sendNotification/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}
@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}
  @EventPattern('notifications.send-notifications')
  async handleSandNotification(@Payload() payload: SendNotificationPayload) {
    const { content, category, recipientId } = payload;
    await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
  }
}
