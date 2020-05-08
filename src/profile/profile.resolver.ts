import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProfileType } from './profile.type'

@Resolver(of => ProfileType)
export class ProfileResolver {
  @Query(returns => ProfileType)
  profile() {
    return {
      id: '1131441',
      name: 'zzz',
      username: 'dsfdg',
    }
  }

  @Mutation(returns => ProfileType)
  createProfile() {

  }
}
