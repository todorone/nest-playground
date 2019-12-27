require('dotenv').config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as config from 'config'

async function bootstrap() {
  const configServer = config.get('server')

  const app = await NestFactory.create(AppModule)
  const port = configServer.port
  await app.listen(port)
}

bootstrap()
