import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase.service';

@Module({
  controllers: [],
  providers: [FirebaseAdminService],
  exports: [FirebaseAdminService]
})
export class AuthModule { }
