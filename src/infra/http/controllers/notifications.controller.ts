import { GetRecipientNotification } from '@app/useCase/getRecipientsNotifications/get-recipients-notifications';
import { CountRecipientNotification } from '@app/useCase/countRecipient/count-recipient-notification';
import { UnreadNotification } from '@app/useCase/unreadNotification/unread-notification';
import { ReadNotification } from '@app/useCase/readNotification/read-notification';
import { CancelNotification } from '@app/useCase/cancelNotification/cancel-notification';
import { HTTPNotificationAdapter } from '../httpNotificationAdapter/http-notification-adpter';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@app/useCase/sendNotification/send-notification';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseCreateNotification } from '../dtos/response-create-notification';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotification: CountRecipientNotification,
    private readonly getRecipientNotification: GetRecipientNotification,
  ) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResponseCreateNotification,
  })
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
    return {
      notification: HTTPNotificationAdapter.toHTTP(notification),
    };
  }

  @ApiNotFoundResponse({
    description: 'Notification not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Patch('read/:id')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @ApiNotFoundResponse({
    description: 'Notification not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Patch('unread/:id')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @ApiNotFoundResponse({
    description: 'Notification not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Patch('cancel/:id')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @ApiNotFoundResponse({
    description: 'Notification not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get('/recipient/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });
    return { notifications: notifications.map(HTTPNotificationAdapter.toHTTP) };
  }

  @ApiNotFoundResponse({
    description: 'Notification not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get('/recipient/count/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });
    return { count };
  }
}
