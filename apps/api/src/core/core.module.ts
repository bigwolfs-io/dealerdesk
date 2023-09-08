import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TasksModule } from '../tasks/tasks.module';
import { AuthModule } from '../auth/auth.module';
import { PreauthMiddleware } from '../auth/guards/preauth.middleware';
import { User, UserSchema } from '../auth/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { PreauthGuard } from '../auth/guards/preauth.guard';

function getDbConfig(configService: ConfigService) {
  if (configService.get('NODE_ENV') === 'test') {
    return {
      uri: 'mongodb://localhost:27017/dealerdesk-integration-test',
    }
  } else {
    return {
      uri: configService.get<string>('MONGODB_URI') ?? 'mongodb://localhost:27017/dealerdesk',
    }
  }
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...getDbConfig(configService)
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TasksModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [CoreController],
  providers: [
    CoreService,
    {
      provide: APP_GUARD,
      useClass: PreauthGuard,
    },
  ],
})

export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
