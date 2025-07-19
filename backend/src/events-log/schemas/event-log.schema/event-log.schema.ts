import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EventLog extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  taskId: number;

  @Prop({ required: true })
  userId: number;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);
