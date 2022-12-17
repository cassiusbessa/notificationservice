import { NotificationRepository } from '../../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '.././errors/notification-not-found';

export interface UnReadNotificationRequest {
  notificationId: string;
}

type UnReadNotificationResponse = void;

@Injectable()
export class UnReadNotification {
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}
  async execute(
    request: UnReadNotificationRequest,
  ): Promise<UnReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);

    return;
  }
}
