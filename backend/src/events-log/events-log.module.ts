import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsLogService } from './events-log.service';
import { EventLog, EventLogSchema } from './schemas/event-log.schema/event-log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: EventLog.name, schema: EventLogSchema }])],
  providers: [EventsLogService],
  exports: [EventsLogService],
})
export class EventsLogModule {}
