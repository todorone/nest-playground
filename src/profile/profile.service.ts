import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Profile } from './profile'
import { Repository } from 'typeorm'
import { CreateProfileInput } from './profile.input'
import { ProfileType } from './profile.type'

@Injectable()
export class ProfileService {
  constructor (
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  getProfile(id: string): Promise<Profile> {
    return this.profileRepository.findOne(id)
  }

  createProfile(createProfileInput: CreateProfileInput): Promise<Profile> {
    const profile = this.profileRepository.create(createProfileInput)

    return this.profileRepository.save(profile)
  }

  convertDbToPayload = (profile: Profile): ProfileType => {
    const { _id, ...restProfile } = profile

    return { id: _id, ...restProfile }
  }
}
