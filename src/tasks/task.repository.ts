import { EntityRepository, Repository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/createTask.dto'
import { TaskStatus } from './taskStatus'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task()
    task.title = createTaskDto.title
    task.description = createTaskDto.description
    task.status = TaskStatus.OPEN

    await task.save()

    return task
  }
}
