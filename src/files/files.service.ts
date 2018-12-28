import { Injectable } from '@nestjs/common';
import * as path from 'path';

import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FilesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async uploadFile(fileId: string, file: any) {
    const { mimetype, originalname, buffer } = file;
    const fileName = `images/${fileId}${path.extname(originalname)}`;

    return this.firebaseService.bucket
      .file(fileName)
      .save(buffer, { contentType: mimetype })
      .then(
        () =>
          `https://firebasestorage.googleapis.com/v0/b/${
            this.firebaseService.bucket.name
          }/o/${encodeURIComponent(fileName)}?alt=media`
      );
  }
}
