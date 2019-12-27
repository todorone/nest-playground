import { EntityRepository, Repository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/createTask.dto'
import { TaskStatus } from './taskStatus'
import { GetTasksFilterDto } from './dto/getTasksFilter.dto'
import { User } from '../auth/user.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
      user,
    })

    await task.save()

    delete task.user

    return task
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto
    const query = this.createQueryBuilder('task')

    query.where('task.userId = :userId', { userId: user.id })

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }

    return query.getMany()
  }
}
