import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'

import { typeOrmConfig } from './config/typeorm.config'
import { ProfileModule } from './profile/profile.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    ProfileModule,
  ],
})
export class AppModule {}
