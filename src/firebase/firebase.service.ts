import { Bucket } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import * as admin from 'firebase-admin';

const FIREBASE_CREDENTIALS_FILE_PATH = 'firebase-credentials-file.json';

@Injectable()
export class FirebaseService {
  public readonly app: admin.app.App;
  public readonly bucket: Bucket;
  constructor(private readonly configService: ConfigService) {
    this.app = admin.initializeApp({
      storageBucket: this.configService.firebaseBucketPath,
      credential: admin.credential.cert(FIREBASE_CREDENTIALS_FILE_PATH)
    });

    this.bucket = this.app.storage().bucket();
  }
}
