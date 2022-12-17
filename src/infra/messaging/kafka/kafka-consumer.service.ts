import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['delicate-owl-13654-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'ZGVsaWNhdGUtb3dsLTEzNjU0JNje87RI9Ot23nMlD27QT2BEba7QkcnrqLgTJRE',
          password:
            'fgmwHYkKXH7w071KHv3nzG3FdtQUJeLtp1wktbG6yFkJk0TlmIZZ8juWuc7YtiSznUVPmQ==',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
