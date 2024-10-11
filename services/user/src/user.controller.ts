import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUser')
  getUser(data: { id: number }) {
    return this.userService.getUser(data.id);
  }

  @GrpcMethod('UserService', 'CreateUser')
  createUser(data: { name: string; email: string; username: string; password: string }) {
    return this.userService.createUser(data);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  updateUser(data: { id: number; name?: string; email?: string; username?: string; password?: string }) {
    const { id, ...updateData } = data;
    return this.userService.updateUser(id, updateData);
  }

  @GrpcMethod('UserService', 'DeleteUser')
  deleteUser(data: { id: number }) {
    return this.userService.deleteUser(data.id);
  }

  @GrpcMethod('UserService', 'Login')
  login(data: { username: string; password: string }) {
    return this.userService.login(data.username, data.password);
  }
}