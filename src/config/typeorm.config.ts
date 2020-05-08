import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config'
import { Profile } from '../profile/profile.entity'

const dbConfig = config.get('db')

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  url: dbConfig.url,
  entities: [Profile],
  // entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
  useUnifiedTopology: true,
}
