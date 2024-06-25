import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema, Videos, VideosSchema } from './app.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/unlock-comments'),
  MongooseModule.forFeature([{ name: Comments.name, schema: CommentsSchema }]),
  MongooseModule.forFeature([{ name: Videos.name, schema: VideosSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
