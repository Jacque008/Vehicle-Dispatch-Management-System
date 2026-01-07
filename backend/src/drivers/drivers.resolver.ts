import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver('Driver')
export class DriversResolver {
  constructor(private driversService: DriversService) {}

  @Mutation(() => String)
  async registerDriver(
    @Args('email') email: string,
    @Args('phone') phone: string,
    @Args('name') name: string,
  ): Promise<any> {
    const driver = await this.driversService.registerDriver(email, phone, name);
    return driver;
  }

  @Query(() => [String])
  @UseGuards(GqlAuthGuard)
  async listDrivers(@Args('status', { nullable: true }) status?: string): Promise<any[]> {
    return this.driversService.listAll(status as any);
  }
}
