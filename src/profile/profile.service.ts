import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Profile } from './profile.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProfileService {
  constructor (
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  getProfile(id: string): Promise<Profile> {
    return this.profileRepository.findOne(id)
  }

  createProfile(name: string, username: string): Promise<Profile> {
    const profile = this.profileRepository.create({ name, username })

    return this.profileRepository.save(profile)
  }
}
