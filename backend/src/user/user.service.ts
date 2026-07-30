import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Create } from './crud/create';
import { Params } from './crud/params';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(create: Create): Promise<User> {
    const user = this.userRepository.create(create);
    return await this.userRepository.save(user);
  }

  async find(params: Params): Promise<User[]> {
    const users = this.userRepository.find({
      where: {
        username: params.username,
        email: params.email
      },
      relations: {
        repos: eval(params.showRepo || "false"),
      },
    });
    return users;
  }
}
