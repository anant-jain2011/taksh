import { IsEmail, IsOptional, IsString } from 'class-validator';

export class Params {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  showRepo?: string;
}
