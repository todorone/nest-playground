import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProfileType } from './profile.type'
import { ProfileService } from './profile.service'
import { CreateProfileInput } from './profile.input'

@Resolver(of => ProfileType)
export class ProfileResolver {
  constructor (
    private profileService: ProfileService
  ) {}

  @Query(returns => ProfileType)
  async getProfile(
    @Args('id') id: string
  ): Promise<ProfileType> {
    return this.profileService.convertDbToPayload(
      await this.profileService.getProfile(id)
    )
  }

  @Mutation(returns => ProfileType)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<ProfileType> {
    const profile = await this.profileService.createProfile(createProfileInput)

    return this.profileService.convertDbToPayload(profile)
  }
}
