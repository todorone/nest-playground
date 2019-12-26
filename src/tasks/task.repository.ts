import { EntityRepository, Repository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/createTask.dto'
import { TaskStatus } from './taskStatus'
import { GetTasksFilterDto } from './dto/getTasksFilter.dto'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    })

    await task.save()

    return task
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto
    const query = this.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }

    return query.getMany()
  }
}
