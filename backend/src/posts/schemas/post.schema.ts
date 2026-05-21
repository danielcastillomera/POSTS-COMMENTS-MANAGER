import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true, trim: true, minlength: 3 })
  title: string;

  @Prop({ required: true, trim: true, minlength: 10 })
  body: string;

  @Prop({ required: true, trim: true })
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
