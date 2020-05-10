import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver'
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Profile } from './profile'

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
