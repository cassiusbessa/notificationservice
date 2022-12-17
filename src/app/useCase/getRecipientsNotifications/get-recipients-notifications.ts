import { NotificationRepository } from '../../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { Notification } from '../../entities/notification';

export interface GetRecipientNotificationRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}
  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
