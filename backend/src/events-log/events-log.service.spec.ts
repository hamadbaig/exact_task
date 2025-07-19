import { Test, TestingModule } from '@nestjs/testing';
import { EventsLogService } from './events-log.service';

describe('EventsLogService', () => {
  let service: EventsLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsLogService],
    }).compile();

    service = module.get<EventsLogService>(EventsLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
