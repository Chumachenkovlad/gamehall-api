import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ErrorsInterceptor());
  await app.listen(3000);
}
bootstrap();
