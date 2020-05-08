import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Profile')
export class ProfileType {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  username: string

  @Field()
  avatar: string

  @Field()
  avatarSmall: string
}
