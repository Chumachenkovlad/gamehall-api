import { NestFactory } from '@nestjs/core';
import { ErrorsInterceptor } from 'common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ErrorsInterceptor());
  await app.listen(3000);
}
bootstrap();
