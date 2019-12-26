import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TaskStatus } from './taskStatus'
import { CreateTaskDto } from './dto/createTask.dto'
import { TaskStatusValidationPipe } from './pipes/taskStatusValidation.pipe'
import { Task } from './task.entity'

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(): Task[] {
  //   return this.tasksService.getAllTasks()
  // }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id)
  }

  // @Patch('/:id/status')
  // patchTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ) {
  //   const task = this.tasksService.updateTask(id, { status })
  //
  //   if (!task) throw new NotFoundException()
  //
  //   return task
  // }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    const isSuccess = await this.tasksService.deleteTask(id)

    if (!isSuccess) throw new NotFoundException()
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto)
  }
}
