import {
  Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe,
  Patch, Post, Query, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common' // prettier-ignore
import { TasksService } from './tasks.service'
import { TaskStatus } from './taskStatus'
import { CreateTaskDto } from './dto/createTask.dto'
import { TaskStatusValidationPipe } from './pipes/taskStatusValidation.pipe'
import { Task } from './task.entity'
import { GetTasksFilterDto } from './dto/getTasksFilter.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../auth/getUser.decorator'
import { User } from '../auth/user.entity'

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user)
  }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id)
  }

  @Patch('/:id/status')
  async patchTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return this.tasksService.updateTask(id, { status })
  }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    const isSuccess = await this.tasksService.deleteTask(id)

    if (!isSuccess) throw new NotFoundException()
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user)
  }
}
