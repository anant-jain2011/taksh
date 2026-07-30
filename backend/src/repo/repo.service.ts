import { Create } from './crud/create';
import { Params } from './crud/params';
import { Injectable } from '@nestjs/common';
import { Repo } from './entity/repo.entity';
import { User } from 'src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class RepoService {
  constructor(
    @InjectRepository(Repo)
    private readonly repoRepository: Repository<Repo>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(create: Create): Promise<Repo> {
    let { username, name } = create;
    let owner: User = (
      await this.userRepository.find({
        where: {
          username,
        },
      })
    )[0];
    const repo = this.repoRepository.create({ owner, name });
    return await this.repoRepository.save(repo);
  }

  async find(params: Params): Promise<Repo[]> {
    let p2: FindOptionsWhere<Repo> = {};
    if (params.username) {
      let user: User[] = await this.userRepository.find({
        where: {
          username: params.username,
        },
      });
      p2.owner = user[0];
    }
    if (params.name) {
      p2.name = params.name;
    }
    const repos = this.repoRepository.find({
      where: p2,
      relations: {
        owner: true,
      }
    });
    return repos;
  }
}
