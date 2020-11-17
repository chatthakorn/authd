import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/createUser')
  create(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.userService.create({ email, password });
  }
}
