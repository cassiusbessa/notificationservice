import { NotificationRepository } from '../../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '.././errors/notification-not-found';

export interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}
  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);

    return;
  }
}
