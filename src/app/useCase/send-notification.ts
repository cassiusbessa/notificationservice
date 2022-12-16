import { Notification } from './../entities/notification';
import { Content } from '../entities/content';
import { NotificationRepository } from '../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

export interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);
    return { notification };
  }
}
