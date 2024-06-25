import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create_comments_dto } from './app.dto';
import { Comments, Videos, VideosDocument } from './app.schema';
//
@Injectable()
export class AppService {
  /* async get_comments(): Promise<any> {


 
     // Get comments from db
     let comments: any[] = await this.commentsModel.find();
 
     // Check if comments are present
     if (!comments || comments.length === 0) {
       console.log("No comments found");
       return [];
     }
 
     const comment = comments[0];
 
     // Get video youtube ID with its mongo id
     let video = await this.videosModel.findById(comment.videoId);
     if (!video) {
       console.log("No video found");
       return [];
     }
 
     console.log(video);
 
     const information = {
       user: comment.user,
       content: comment.content,
       videoId: video.videoId
     };
 
     console.log(information);
     return [information];
   }
 */



  async get_video_comments(videoId: string): Promise<any[]> {


    const video: any = await this.videosModel.findOne({ videoId: videoId })

    if (!video) {
      console.log("Video could not founded")
      return null
    }

    console.log(video)
    const comments: any = await this.commentsModel.find({ videoId: video._id })

    if (!comments && comments.length == 0) {
      console.log("No comments yet")
      return null
    }

    console.log("Comments:", comments)
    return comments
  }

  async create_comment(informations: create_comments_dto): Promise<Error> {
    const presence_video: VideosDocument = await this.videosModel.findOne({ videoId: informations.videoId })

    if (!presence_video) {
      console.log("Could not found any comment for this video, creating now .....")

      try {
        const created_video: VideosDocument = await this.videosModel.create({ videoId: informations.videoId })
        await this.commentsModel.create({
          user: informations.user, content: informations.content, videoId: created_video._id
        })
        return null
      } catch (e) {
        console.log("Error:", e)
        return e;
      }
    };

    // If video there 
    await this.commentsModel.create({
      user: informations.user, content: informations.content, videoId: presence_video._id
    });

    console.log("Recorded video and its comment")
    return null;
  }

  constructor(@InjectModel(Comments.name) private commentsModel: Model<Comments>, @InjectModel(Videos.name) private videosModel: Model<Videos>) { }
}