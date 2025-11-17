import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const task = this.taskRepository.create({
      ...createTaskDto,
      user: user,
    });
    return await this.taskRepository.save(task);
  }

  async findAll(userId: string) {
    const userTasks = await this.taskRepository.find({
      where: { user: { id: userId } },
    });
    return userTasks;
  }

  async findOne(id: string, userId: string) {
    const task = await this.taskRepository.findOne({
      where: { id: id, user: { id: userId } },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found for the user.`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    const task = await this.findOne(id, userId);

    Object.assign(task, updateTaskDto);

    return await this.taskRepository.save(task);
  }

  async remove(id: string, userId: string) {
    const task = await this.findOne(id, userId);
    return await this.taskRepository.remove(task);
  }
}
