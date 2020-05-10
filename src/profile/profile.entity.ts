import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class Profile {
  @ObjectIdColumn()
  _id: string

  @Column()
  created: number

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  avatar: string

  @Column()
  avatarSmall: string

  @Column()
  color: string

  @Column()
  qr: string
}
