import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentsDocument = HydratedDocument<Comments>;
export type VideosDocument = HydratedDocument<Videos>;
//
@Schema()
export class Comments {
    @Prop()
    user: string;

    @Prop()
    content: string;

    @Prop()
    videoId: string;
}


@Schema()
export class Videos {
    @Prop()
    videoId: string;
}



export const CommentsSchema = SchemaFactory.createForClass(Comments);
export const VideosSchema = SchemaFactory.createForClass(Videos);