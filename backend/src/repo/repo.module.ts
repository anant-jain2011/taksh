import { Module } from '@nestjs/common';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';
import { Repo} from './entity/repo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Repo, User])],
  controllers: [RepoController],
  providers: [RepoService],
})
export class RepoModule {}
