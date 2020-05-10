import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Profile')
export class ProfileType {
  @Field(type => ID)
  id: string

  @Field()
  created: number

  @Field()
  name: string

  @Field()
  username: string

  @Field()
  avatar: string

  @Field()
  avatarSmall: string

  @Field()
  color: string

  @Field()
  qr: string
}
