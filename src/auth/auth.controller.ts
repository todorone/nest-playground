import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthCredentialsDto } from './dto/authCredentials.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/signUp')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signIn')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken }> {
    return this.authService.signIn(authCredentialsDto)
  }
}
