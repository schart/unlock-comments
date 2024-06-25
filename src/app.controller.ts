import { Response } from 'express';
import { AppService } from './app.service';
import { create_comments_dto, video_id_dto } from './app.dto';
import { Body, Controller, Get, HttpStatus, Post, Render, Res } from '@nestjs/common';

@Controller('comments')
export class AppController {//
  @Get('/')
  @Render('index')
  async home(@Res() res: Response): Promise<any> {
    // let comments = await this.appService.get_video_comments();
    return {};
  }


  @Post('/get-comments')
  async getComments(@Res() res: Response, @Body() informations: video_id_dto): Promise<any> {
    let comments = await this.appService.get_video_comments(informations.videoId);
    return res.send({ comments });
  }

  @Post('/create')
  async createComment(@Res() res: Response, @Body() informations: create_comments_dto): Promise<any> {
    try {
      const result = await this.appService.create_comment(informations);
      console.log("Success: ", result);
      return res.status(HttpStatus.OK).json({ ok: true });
    } catch (err) {
      console.log("Error: ", err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ ok: false });
    }
  }

  constructor(private readonly appService: AppService) { }
};