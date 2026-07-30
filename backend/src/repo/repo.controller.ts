import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RepoService } from './repo.service';
import { Create } from './crud/create';
import { Params } from './crud/params';

@Controller('repo')
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @Post('create')
  // @ts-ignore
  async create(@Body() create: Create) {
    await this.repoService.create(create);
    return { message: 'repo created successfully' };
  }

  @Get('find')
  async find(@Param() params: Params) {
    let repos = await this.repoService.find(params);
    return repos;
  }
}
