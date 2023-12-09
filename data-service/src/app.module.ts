import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${
        process.env.HOST_DOCKER_CONTAINER
          ? process.env.HOST_DOCKER_CONTAINER
          : 'localhost'
      }:${process.env.DATEBASE_PORT_MONGO}/${process.env.DATEBASE_NAME_MONGO}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
