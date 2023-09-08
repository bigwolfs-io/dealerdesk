
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { FirebaseAdminService } from '../firebase.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';

export type JwtUser = {
  _id: string;
  email: string;
  sub: string;
};

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name) private readonly user: Model<User>,
    private readonly firebaseService: FirebaseAdminService,
  ) { }
  use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token && token !== null && token !== '') {
      this.firebaseService.firebase
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          let userDB = await this.user.findOne({
            email: decodedToken.email,
          });

          if (!userDB) {
            userDB = await new this.user({
              email: decodedToken.email,
            }).save();
          }

          const user: JwtUser = {
            _id: userDB._id.toString(),
            email: decodedToken.email,
            sub: decodedToken.sub,
          };

          req['user'] = user;
          next();
        })
        .catch((error) => {
          console.error(error);
          next();
        });
    } else {
      next();
    }
  }
}
