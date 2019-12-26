import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/createTask.dto'
import { TaskRepository } from './task.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { GetTasksFilterDto } from './dto/getTasksFilter.dto'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto)
  }


  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id)

    if (!task) {
      throw new NotFoundException()
    } else return task
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id)
    return result.affected > 0
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  async updateTask(id: number, patch: Partial<Task>): Promise<Task> {
    const task = await this.getTaskById(id)

    Object.entries(patch).forEach(([key, value]) => task[key] = value)

    await task.save()

    return task
  }
}
