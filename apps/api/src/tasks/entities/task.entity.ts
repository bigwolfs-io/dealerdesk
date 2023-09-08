import { TaskPriority } from '@dealerdesk/shared/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../auth/entities/user.entity';

export type TaskDocument = HydratedDocument<Task>

@Schema()
export class Task {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date })
  dueDate?: Date;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: String, enum: Object.values(TaskPriority), default: 'medium' })
  priority: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
