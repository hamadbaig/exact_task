import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventLog } from './schemas/event-log.schema/event-log.schema';

@Injectable()
export class EventsLogService {
  constructor(
    @InjectModel(EventLog.name)
    private readonly eventLogModel: Model<EventLog>,
  ) {}

  async logEvent(data: {
    type: string;
    description: string;
    taskId: number;
    userId: number;
  }) {
    const log = new this.eventLogModel(data);
    return log.save();
  }
}
