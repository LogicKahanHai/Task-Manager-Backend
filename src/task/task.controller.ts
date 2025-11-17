import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { AuthenticatedRequest } from 'src/utils/types/authenticated.request.type';
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor';
import { TaskResponseDto } from './dto/response.dto';

@Controller('task')
@UseInterceptors(new ResponseInterceptor(TaskResponseDto))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(createTaskDto, req.user);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.taskService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.taskService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto, req.user.id);
  }

  @Delete(':id')
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.taskService.remove(id, req.user.id);
  }
}
