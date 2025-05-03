// rabbitmq.options.ts
import { RmqOptions, Transport } from '@nestjs/microservices';
import { config } from './config.service';

export const getRmqOptions = (queue: string): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [config().microservice.RABBIT_MQ_URL],
    queue,
    queueOptions: {
      durable: true, // Make sure the queue survives server restarts
    },
  },
});
