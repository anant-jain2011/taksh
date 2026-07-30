import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { RepoModule } from './repo/repo.module';
import { Repo } from './repo/entity/repo.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        invalidWhereValuesBehavior: {
          undefined: 'ignore',
          null: 'ignore',
        },
        entities: [User, Repo],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RepoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
