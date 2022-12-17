import { UnreadNotification } from '@app/useCase/unreadNotification/unread-notification';
import { ReadNotification } from '@app/useCase/readNotification/read-notification';
import { GetRecipientNotification } from '@app/useCase/getRecipientsNotifications/get-recipients-notifications';
import { CountRecipientNotification } from '@app/useCase/countRecipient/count-recipient-notification';
import { CancelNotification } from '@app/useCase/cancelNotification/cancel-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from '@app/useCase/sendNotification/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
