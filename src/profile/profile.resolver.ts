import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProfileType } from './profile.type'
import { ProfileService } from './profile.service'

@Resolver(of => ProfileType)
export class ProfileResolver {
  constructor (
    private profileService: ProfileService
  ) {}

  @Query(returns => ProfileType)
  async getProfile(
    @Args('id') id: string
  ): Promise<ProfileType> {
    const profile = await this.profileService.getProfile(id)

    const { _id, ...restProfile } = profile

    return { id: _id, ...restProfile }
  }

  @Mutation(returns => ProfileType)
  createProfile(
    @Args('name') name: string,
    @Args('username') username: string,
  ) {
    return this.profileService.createProfile(name, username)
  }
}
