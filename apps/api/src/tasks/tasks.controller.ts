import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskPriority } from '@dealerdesk/shared/types';
import { JwtUser } from '../auth/guards/preauth.middleware';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: JwtUser) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.tasksService.update(id, { completed: true });
  }

  @Patch(':id/prioritize/:priority')
  prioritize(@Param('id') id: string, @Param('priority') priority: TaskPriority) {
    return this.tasksService.update(id, { priority: priority });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Get()
  findAll(@GetUser() user: JwtUser) {
    return this.tasksService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }
}
