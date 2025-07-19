import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsLogService } from '../events-log/events-log.service';
import { EventsGateway } from '../events/events.gateway';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private readonly eventsGateway: EventsGateway,
    private readonly eventsLogService: EventsLogService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.userRepo.findOne({ where: { id: createTaskDto.assignedTo } });
    if (!user) throw new NotFoundException('Assigned user not found');

    const task = this.taskRepo.create({
      ...createTaskDto,
      assignedTo: user,
    });

    const savedTask = await this.taskRepo.save(task);

    // ✅ Emit WebSocket event
    this.eventsGateway.sendTaskUpdate({
      type: 'created',
      task: savedTask,
    });

    // ✅ Log to MongoDB
    await this.eventsLogService.logEvent({
      type: 'created',
      description: `Task "${savedTask.title}" created.`,
      taskId: savedTask.id,
      userId: savedTask.assignedTo.id,
    });

    return savedTask;
  }

  findAll() {
    return this.taskRepo.find({ relations: ['assignedTo'] });
  }

  async findOne(id: number) {
    const task = await this.taskRepo.findOne({ where: { id }, relations: ['assignedTo'] });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, updateDto: UpdateTaskDto) {
    await this.taskRepo.update(id, updateDto);
    const updated = await this.findOne(id);

    // ✅ Emit WebSocket event
    this.eventsGateway.sendTaskUpdate({
      type: 'updated',
      task: updated,
    });

    // ✅ Log to MongoDB
    await this.eventsLogService.logEvent({
      type: 'updated',
      description: `Task "${updated.title}" updated.`,
      taskId: updated.id,
      userId: updated.assignedTo?.id || 0,
    });

    return updated;
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    return this.taskRepo.remove(task);
  }
}
