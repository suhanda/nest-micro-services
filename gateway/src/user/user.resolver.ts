import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { User } from './user.model';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginResponse } from './login-response.model';

interface UserService {
  getUser(data: { id: number }): Promise<User>;
  createUser(data: { name: string; email: string; username: string; password: string }): Promise<User>;
  updateUser(data: { id: number; name?: string; email?: string; username?: string; password?: string }): Promise<User>;
  deleteUser(data: { id: number }): Promise<User>;
  login(data: { username: string; password: string }): Promise<LoginResponse>;
}

@Resolver(() => User)
export class UserResolver implements OnModuleInit {
  private userService: UserService;

  constructor(
    @Inject('USER_PACKAGE') private client: ClientGrpc,
    private authService: AuthService
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async user(@Args('id') id: number) {
    return this.userService.getUser({ id });
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string
  ) {
    return this.userService.createUser({ name, email, username, password });
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('id') id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('username', { nullable: true }) username?: string,
    @Args('password', { nullable: true }) password?: string
  ) {
    return this.userService.updateUser({ id, name, email, username, password });
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Args('id') id: number) {
    return this.userService.deleteUser({ id });
  }

  @Mutation(() => LoginResponse)
  async login(@Args('username') username: string, @Args('password') password: string) {
    const result = await this.userService.login({ username, password });
    if (result.success) {
      const { access_token } = await this.authService.login(result.user);
      return {
        ...result,
        access_token,
      };
    }
    return result;
  }
}