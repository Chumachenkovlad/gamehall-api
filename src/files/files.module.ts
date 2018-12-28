import { Module } from '@nestjs/common';

import { FirebaseModule } from '../firebase/firebase.module';
import { FilesService } from './files.service';

@Module({
  imports: [FirebaseModule],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
