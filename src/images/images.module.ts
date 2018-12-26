import { Module } from '@nestjs/common';

import { ImagesController } from './images.controller';
import { IMAGES_PROVIDERS } from './images.providers';
import { ImagesService } from './images.service';

@Module({
  providers: [ImagesService, ...IMAGES_PROVIDERS],
  controllers: [ImagesController]
})
export class ImagesModule {}
