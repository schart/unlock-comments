import { IsString } from "class-validator";

export class create_comments_dto {
    @IsString()
    user: string

    @IsString()
    content: string

    @IsString()
    videoId: string
}

export class video_id_dto {
    @IsString()
    videoId: string
}