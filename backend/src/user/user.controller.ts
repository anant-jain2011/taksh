import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Create } from './crud/create';
import { Params } from './crud/params';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  // @ts-ignore
  async create(@Body() create: Create) {
    await this.userService.create(create);
    return { message: 'user created successfully' };
  }

  @Get('find')
  async find(@Query() params: Params) {
    let users = await this.userService.find(params);
    return users;
  }
}
