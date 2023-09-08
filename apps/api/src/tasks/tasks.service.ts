import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { JwtUser } from '../auth/guards/preauth.middleware';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly task: Model<Task>) { }

  async create(task: CreateTaskDto, user: JwtUser): Promise<Task> {
    return new this.task({ ...task, dueDate: task.dueDate ? new Date(task.dueDate) : undefined, user: user._id }).save();
  }

  async findAll(user: JwtUser): Promise<Task[]> {
    return this.task.find({
      user: user._id,
    }).exec();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.task.findById(id).exec();
  }

  async update(id: string, task: UpdateTaskDto): Promise<Task | null> {
    return this.task.findByIdAndUpdate(id, task, { new: true }).exec();
  }

  async remove(id: string): Promise<Task | null> {
    return this.task.findByIdAndRemove(id).exec();
  }
}
