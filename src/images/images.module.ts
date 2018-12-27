import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { FilesModule } from 'files/files.module';

import { ImagesController } from './images.controller';
import { IMAGES_PROVIDERS } from './images.providers';
import { ImagesService } from './images.service';

@Module({
  imports: [DatabaseModule, FilesModule],
  providers: [ImagesService, ...IMAGES_PROVIDERS],
  controllers: [ImagesController]
})
export class ImagesModule {}
