import { NotificationRepository } from '../../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '.././errors/notification-not-found';

export interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}
  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
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
