import { BadRequestException, PipeTransform } from '@nestjs/common'
import { TaskStatus } from '../taskStatus'

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.COMPLETED,
    TaskStatus.IN_PROGRESS,
  ]

  transform(value: any): any {
    value = value.toUpperCase()

    if (!this.isStatusValid(value)) throw new BadRequestException(`"${value}" is an invalid status`)

    return value
  }

  private isStatusValid(status: any): boolean {
    return this.allowedStatuses.includes(status)
  }
}
