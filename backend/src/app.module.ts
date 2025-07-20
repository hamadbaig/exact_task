import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { EventsLogModule } from './events-log/events-log.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hammad@123',
      database: 'task_manager',
      synchronize: true, 
      autoLoadEntities: true,
    }),

    MongooseModule.forRoot(
      'mongodb+srv://hammad:hammad%40123@paradise-store.y3w9cfo.mongodb.net/2013',
    ),

    UsersModule,
    AuthModule,
    TasksModule,
    EventsLogModule,
    EventsModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
