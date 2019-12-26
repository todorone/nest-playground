import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/createTask.dto'

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks()
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Patch('/:id/status')
  patchTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ) {
    console.log('status', status)

    const task = this.tasksService.updateTask(id, { status })

    if (!task) throw new NotFoundException()

    return task
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    const isSuccess = this.tasksService.deleteTask(id)

    if (!isSuccess) throw new NotFoundException()
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }
}
