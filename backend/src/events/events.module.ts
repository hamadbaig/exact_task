import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsLogService } from 'src/events-log/events-log.service';
import { EventLog, EventLogSchema } from 'src/events-log/schemas/event-log.schema/event-log.schema';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventLog.name, schema: EventLogSchema }
    ]),
  ],
  providers: [EventsGateway, EventsLogService],
  exports: [EventsGateway, EventsLogService],
})
export class EventsModule {}
