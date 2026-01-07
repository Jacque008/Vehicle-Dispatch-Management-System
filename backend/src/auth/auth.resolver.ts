import { Resolver, Mutation, Args, Query, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpService } from './otp.service';
import { ManagersService } from './managers.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import GraphQLJSON from 'graphql-type-json';

// GraphQL types
@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => GraphQLJSON)
  user: any;
}

@ObjectType()
class OtpResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private otpService: OtpService,
    private managersService: ManagersService,
  ) {}

  @Mutation(() => LoginResponse)
  async managerLogin(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<any> {
    return this.authService.managerLogin(email, password);
  }

  @Mutation(() => LoginResponse)
  async createManager(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
  ): Promise<any> {
    const manager = await this.managersService.createManager(email, password, name);
    return this.authService.managerLogin(email, password);
  }

  @Mutation(() => OtpResponse)
  async sendOtp(@Args('email') email: string): Promise<OtpResponse> {
    return this.otpService.sendOtp(email);
  }

  @Mutation(() => String)
  async verifyOtp(
    @Args('email') email: string,
    @Args('code') code: string,
  ): Promise<string> {
    await this.otpService.verifyOtp(email, code);
    return 'OTP verified successfully';
  }

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: any): Promise<string> {
    return `Hello ${user.name}, you are authenticated as ${user.userType}`;
  }
}
