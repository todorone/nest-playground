import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class Profile {
  @ObjectIdColumn()
  _id: string

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  avatar: string

  @Column()
  avatarSmall: number
}
