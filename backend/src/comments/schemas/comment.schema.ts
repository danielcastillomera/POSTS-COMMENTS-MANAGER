import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Comment extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Post', index: true })
  postId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true, minlength: 5 })
  body: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
