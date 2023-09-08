import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"
import { ICreateTask, TaskPriority } from '@dealerdesk/shared/types'

export class CreateTaskDto implements ICreateTask {
  @ApiProperty({
    example: 'Drink Coffee',
    description: 'The title of the task',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '',
    description: 'The description of the task',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2023-08-30',
    description: 'The due date of the task in YYYY-MM-DD format.',
  })
  @IsString()
  dueDate: string;

  @ApiProperty({
    example: false,
    description: 'The completed status of the task',
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({
    example: 'low',
    description: 'The priority of the task',
  })
  @IsOptional()
  @IsEnum(Object.values(TaskPriority))
  priority?: TaskPriority;
}
