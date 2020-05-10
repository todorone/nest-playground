import { Field, InputType } from '@nestjs/graphql'
import { MinLength } from 'class-validator'

@InputType()
export class CreateProfileInput {
  @MinLength(3)
  @Field()
  name: string

  @MinLength(3)
  @Field()
  username: string
}
