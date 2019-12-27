import { EntityRepository, Repository } from 'typeorm'
import { genSalt, hash } from 'bcrypt'
import { User } from './user.entity'
import { AuthCredentialsDto } from './dto/authCredentials.dto'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto

    const salt = await genSalt()

    const saltedPassword = await hash(password, salt)

    const user = this.create({ username, password: saltedPassword, salt })

    try {
      await user.save()
    } catch (e) {
      if (e.code === '23505') { // duplicate username
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password} = authCredentialsDto

    const user = await this.findOne({ username })
    if (user && await user.validatePassword(password)) {
      return user.username
    } else {
      return null
    }
  }
}
