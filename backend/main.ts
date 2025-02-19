import { NestFactory } from '@nestjs/core';
import { Task } from './task.model';

async function bootstrap() {
  const app = await NestFactory.create(Task);

  app.enableCors(); 

  await app.listen(3000);
}
bootstrap();
