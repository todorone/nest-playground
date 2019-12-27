import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/authCredentials.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwtPayload'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken }> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto)

    if (!username) throw new UnauthorizedException('Invalid credentials')

    const payload: JwtPayload = { username }
    const accessToken = await this.jwtService.sign(payload)

    return { accessToken }
  }
}
