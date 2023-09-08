
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private defaultApp: firebase.app.App;
  constructor(
    private readonly configService: ConfigService,
  ) { }

  async onModuleInit() {
    if (!firebase.apps.length) {
      this.defaultApp = firebase.initializeApp({
        credential: firebase.credential.cert(
          JSON.parse(this.configService.get('FIREBASE_SERVICE_ACCOUNT_KEY')),
        ),
      });
    } else {
      this.defaultApp = firebase.apps[0];
    }
  }

  get firebase() {
    return this.defaultApp;
  }
}
