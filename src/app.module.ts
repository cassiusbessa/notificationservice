import { MessagingModule } from './infra/messaging/messaging.module';
import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
@Module({
  imports: [HttpModule, DatabaseModule, MessagingModule],
})
export class AppModule {}
