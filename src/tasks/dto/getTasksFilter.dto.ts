import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'
import { TaskStatus } from '../taskStatus'

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED])
  status: TaskStatus

  @IsOptional()
  @IsNotEmpty()
  search: string
}
