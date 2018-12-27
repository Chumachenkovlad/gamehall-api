import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FirebaseModule } from 'firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
