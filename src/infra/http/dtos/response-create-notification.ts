import { ApiProperty } from '@nestjs/swagger';
export class ResponseCreateNotification {
  @ApiProperty({
    description: 'Notificação criada',
    example: {
      id: 'c9b5e8a0-5b9f-4b9c-9c9c-0c9c9c9c9c9c',
      content: 'Cássius Bessa te adicionou!',
      category: 'friendship',
      recipientId: 'c9b5e8a0-5b9f-4b9c-9c9c-0c9c9c9c9c9c',
    },
  })
  notification: {
    id: string;
    content: string;
    category: string;
    recipientId: string;
  };
}
