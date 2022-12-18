import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @ApiProperty({
    description: 'Conteúdo da notificação',
    example: 'Cássius Bessa te adicionou!',
  })
  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @ApiProperty({
    description: 'Categoria da notificação',
    example: 'friendship',
  })
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Id(UUID) do destinatário da notificação',
    example: 'c9b5e8a0-5b9f-4b9c-9c9c-0c9c9c9c9c9c',
  })
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}
