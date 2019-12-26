import { Injectable, NotFoundException } from '@nestjs/common'
import * as uuid from 'uuid/v4'
import { Task, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/createTask.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks() {
    return this.tasks
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(t => t.id === id)

    if (!task) {
      throw new NotFoundException()
    } else return task
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex(t => t.id === id)

    if (index === -1) {
      return false
    } else {
      this.tasks.splice(index, 1)
      return true
    }
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)
    return task
  }

  updateTask(id: string, patch: Partial<Task>): Task | null {
    const task = this.getTaskById(id)

    Object.entries(patch).forEach(([key, value]) => task[key] = value)

    return task
  }
}
