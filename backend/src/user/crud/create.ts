import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { User } from '../entity/user.entity';

export class Create {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  avatar_url!: string;

  followers!: User[];
  followings!: User[];
}
