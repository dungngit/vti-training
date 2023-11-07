import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URI'),
      connectionFactory: (connection: any) => {
        connection.plugin(softDeletePlugin);
        return connection;
      },
    }),
    inject: [ConfigService],
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  ArticlesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
